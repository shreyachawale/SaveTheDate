const Wedding = require('../models/WeddingDetails');
const Host = require('../models/Host');
const User = require('../models/User');

// Create a new wedding
module.exports.createWedding = async (req, res) => {
    const {
        groomName, brideName, tickets, ticketPrice, preWeddingImages, ourStory,
        languages, menu, alcohol, transportation, accommodation,
        day1, day2, hosts, guests
    } = req.body;

    try {
        // Check if hosts and guests exist
        const existingHosts = await Host.find({ _id: { $in: hosts } });
        const existingGuests = await User.find({ _id: { $in: guests } });

        // Create a new wedding
        const newWedding = new Wedding({
            groomName,
            brideName,
            tickets,
            ticketPrice,
            preWeddingImages,
            ourStory,
            languages,
            menu,
            alcohol,
            transportation,
            accommodation,
            day1,
            day2,
            hosts: existingHosts.map(host => host._id),
            guests: existingGuests.map(guest => guest._id),
        });

        await newWedding.save();

        return res.status(201).json({ message: 'Wedding created successfully', wedding: newWedding });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Get all weddings
module.exports.getWeddings = async (req, res) => {
    try {
        const weddings = await Wedding.find().populate('hosts guests');
        console.log('Fetched weddings:', weddings); // Log the fetched weddings
        return res.status(200).json(weddings);
    } catch (error) {
        console.error('Error fetching weddings:', error); // Log the error
        return res.status(500).json({ message: 'Server error', error });
    }
};


// Get wedding by ID
module.exports.getWeddingById = async (req, res) => {
    const { id } = req.params;

    try {
        const wedding = await Wedding.findById(id).populate('hosts guests');
        if (!wedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }
        return res.status(200).json(wedding);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Update wedding details
module.exports.updateWedding = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const wedding = await Wedding.findByIdAndUpdate(id, updateData, { new: true }).populate('hosts guests');
        if (!wedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }
        return res.status(200).json({ message: 'Wedding updated successfully', wedding });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Delete wedding
module.exports.deleteWedding = async (req, res) => {
    const { id } = req.params;

    try {
        const wedding = await Wedding.findByIdAndDelete(id);
        if (!wedding) {
            return res.status(404).json({ message: 'Wedding not found' });
        }
        return res.status(200).json({ message: 'Wedding deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to handle user request to join a wedding
module.exports.requestAccessToWedding = async (req, res) => {
    try {
      const { weddingId } = req.params;
      const { userId } = req.body;
  
      const wedding = await Wedding.findById(weddingId);
  
      if (!wedding) {
        return res.status(404).json({ message: 'Wedding not found' });
      }
  
      // Check if the user has already sent a request
      if (!wedding.requests.includes(userId)) {
        wedding.requests.push(userId);
        await wedding.save();
        res.status(200).json({ message: 'Request sent successfully' });
      } else {
        res.status(400).json({ message: 'Request already sent' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error sending request', error });
    }
  };
  
  // Controller to handle host approval of a user request
  module.exports.approveRequest = async (req, res) => {
    try {
      const { weddingId } = req.params;
      const { userId } = req.body;
  
      const wedding = await Wedding.findById(weddingId);
  
      if (!wedding) {
        return res.status(404).json({ message: 'Wedding not found' });
      }
  
      // Remove the user from requests and add to guests
      wedding.requests = wedding.requests.filter(reqId => reqId.toString() !== userId);
      wedding.guests.push(userId);
      
      await wedding.save();
      res.status(200).json({ message: 'User approved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error approving user', error });
    }
  };