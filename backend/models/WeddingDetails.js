// Define schema for wedding data
const weddingSchema = new mongoose.Schema({
  groomName: String,
  brideName: String,
  tickets: Number,
  ticketPrice: Number,
  preWeddingImages: [String],
  ourStory: String,
  languages: String,
  menu: String,
  alcohol: String,
  transportation: String,
  accommodation: String,
  day1: {
    eventName: String,
    place: String,
    date: String,
    description: String,
    music: String,
    dressCode: String,
    time: String,
  },
  day2: {
    eventName: String,
    place: String,
    date: String,
    description: String,
    music: String,
    dressCode: String,
    time: String,
  },
});

const Wedding = mongoose.model('Wedding', weddingSchema);

  // Create a new wedding entry
  const newWedding = new Wedding({
    groomName: formData.groomName,
    brideName: formData.brideName,
    tickets: formData.tickets,
    ticketPrice: formData.ticketPrice,
    preWeddingImages: preWeddingImages, // Array of image paths
    ourStory: formData.ourStory,
    languages: formData.languages,
    menu: formData.menu,
    alcohol: formData.alcohol,
    transportation: formData.transportation,
    accommodation: formData.accommodation,
    day1: formData.day1,
    day2: formData.day2,
  });

  // Save the new wedding entry to the database


