// Get all violations for a vehicle number
router.get('/chalan/:vehicle', async (req, res) => {
  try {
    const { vehicle } = req.params;
    const violations = await Violation.find({ vehicle });
    res.status(200).json({ success: true, data: violations });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
