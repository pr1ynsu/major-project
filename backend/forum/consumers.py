import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "forum_chat"

        # Join chat room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave chat room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data["message"]
        username = data["username"]

        # Save message to DB
        user = await self.get_user(username)
        if user:
            await self.save_message(user, message)

        # Send message to room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "username": username,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "username": event["username"]
        }))

    @staticmethod
    async def save_message(user, message):
        Message.objects.create(user=user, content=message)

    @staticmethod
    async def get_user(username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None
