import React, { useState } from "react";

const BookingForm = (props) => {
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("");

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitForm(e);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    props.dispatch(selectedDate);
    setTimes("");
  };

  const filteredTimes = props.availableTimes.availableTimes.filter((availableTime) => {
    if (date === today) {
      const currentTime = new Date().toISOString().split("T")[1].substring(0, 5);
      return availableTime > currentTime;
    }
    return true;
  });

  return (
    <header>
      <section>
        <form onSubmit={handleSubmit}>
          <fieldset className="formField">
            <div>
              <label htmlFor="book-date">Choose Date:</label>
              <input
                id="book-date"
                value={date}
                onChange={handleDateChange}
                type="date"
                min={today}
                required
              />
            </div>

            <div>
              <label htmlFor="book-time">Choose Time:</label>
              <select
                id="book-time"
                value={times}
                onChange={(e) => setTimes(e.target.value)}
                required
              >
                <option value="">Select a Time</option>
                {filteredTimes.map((availableTime) => (
                  <option key={availableTime}>{availableTime}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="book-guests">Number of Guests:</label>
              <input
                id="book-guests"
                min="1"
                max="10"
                type="number"
                placeholder={0}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="book-occasion">Occasion:</label>
              <select
                id="book-occasion"
                key={occasion}
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option>Birthday</option>
                <option>Anniversary</option>
              </select>
            </div>

            <div className="btnReceive">
              <input
                aria-label="On Click"
                type="submit"
                value={"Make Your Reservation"}
              />
            </div>
          </fieldset>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;
