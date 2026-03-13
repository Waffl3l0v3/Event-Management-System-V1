// Create payment order using gateway (Razorpay etc.).
export const createPaymentOrder = async (req, res) => {
    try {
    const user = req.user;
    const { eventId } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.price === 0) {
      return res.status(400).json({ message: "Event is free" });
    }

    // later this will call Stripe/Razorpay
    const amount = event.price;

    return res.status(200).json({
      message: "Payment intent created",
      amount,
      eventId
    });

  } catch (error) {
    console.log("Error creating payment intent", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Verify payment signature from gateway
export const verifyPayment = async (req, res) => {};

// Check payment status for event registration.
export const getPaymentStatus = async (req, res) => {};

// Refund event payment.
export const refundPayment = async (req, res) => {};
