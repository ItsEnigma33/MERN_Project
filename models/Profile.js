const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // setting type to object Id of Another Schema (user)
    ref: "users"
  },

  handle: {
    type: String,
    required: true,
    max: 40 //setting Maximum Length
  },

  company: {
    type: String
  },

  bio: {
    type: String
  },

  website: {
    type: String
  },

  location: {
    type: String
  },

  skills: {
    type: [String],
    required: true
  },

  status: {
    type: String,
    required: true
  },

  gitHubUserName: {
    type: String
  },

  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      currentWorking: {
        type: Boolean,
        default: false
      }
    }
  ],

  education: [
    {
      school: {
        type: String,
        required: true
      },
      highSchool: {
        type: String
      },
      college: {
        type: String
      },
      fieldOfDegree: {
        type: String,
        required: true
      }
    }
  ],

  social: {
    facebook: {
      type: String
    },
    linkedIn: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", profileSchema);
