export function validateBooking(data) {
  const errs = {};
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || "");
  const isAirport = data.service === "airport";

  if (!data.firstName.trim()) errs.firstName = "Please enter your first name.";
  if (!data.lastName.trim()) errs.lastName = "Please enter your last name.";
  if (!data.email.trim() || !emailOk) errs.email = "Kindly provide a valid email address.";
  if (!data.contactNumber.trim()) errs.contactNumber = "Mobile number is required.";
  if (!data.service) errs.service = "Select a service.";
  if (!data.pickupLocation.trim()) errs.pickupLocation = "Pickup location is required.";
  if (!data.dropLocation.trim()) errs.dropLocation = "Drop location is required.";
  if (!data.date.trim()) errs.date = "Please choose a date.";
  if (!data.time.trim()) errs.time = "Please choose a time.";

  if (isAirport) {
    if (!data.tripType) errs.tripType = "Select Arrival or Departure.";
    if (!data.flightNumber.trim())
      errs.flightNumber = "Flight number is required for Airport Services.";
  }

  const pax = Number(data.passengers || 0);
  const bags = Number(data.luggage || 0);
  if (!pax || pax < 1) errs.passengers = "Number of passengers is required.";
  if (bags < 0) errs.luggage = "Luggage cannot be negative.";
  if (!data.vehicle) errs.vehicle = "Please choose your preferred vehicle class.";

  return errs;
}
