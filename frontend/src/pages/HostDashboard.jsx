import React, { useState } from 'react';
import { Bell, Calendar, Mail, Users } from 'lucide-react';

// Reusable Components
const Card = ({ children, className = '' }) => (
  <div className={`p-4 shadow-md rounded-lg ${className}`}>{children}</div>
);

const Avatar = ({ src, alt, className }) => (
  <div className={`flex items-center justify-center rounded-full overflow-hidden ${className}`}>
    {src ? <img src={src} alt={alt} /> : <span className="text-xl">{alt[0]}</span>}
  </div>
);

const Badge = ({ children, variant = 'default' }) => {
  let classNames = 'px-2 py-1 rounded text-xs ';
  switch (variant) {
    case 'secondary':
      classNames += 'bg-yellow-200 text-yellow-800';
      break;
    case 'destructive':
      classNames += 'bg-red-200 text-red-800';
      break;
    default:
      classNames += 'bg-green-200 text-green-800';
  }
  return <span className={classNames}>{children}</span>;
};

// Main Component
export default function UserDashboard() {
  const [user] = useState({
    name: 'Sarah Johnson',
    avatar: '/placeholder.svg?height=40&width=40'
  });

  const [stats] = useState({
    totalGuests: 150,
    confirmedRSVPs: 98,
    pendingRSVPs: 52,
    unreadMessages: 5
  });

  const [recentRSVPs] = useState([
    { name: 'John Doe', status: 'Confirmed', avatar: '/placeholder.svg?height=32&width=32' },
    { name: 'Jane Smith', status: 'Pending', avatar: '/placeholder.svg?height=32&width=32' },
    { name: 'Mike Johnson', status: 'Declined', avatar: '/placeholder.svg?height=32&width=32' }
  ]);

  const [recentMessages] = useState([
    { sender: 'Wedding Planner', message: 'Final itinerary is ready!', time: '2h ago' },
    { sender: 'Catering Team', message: 'Dietary preferences confirmed', time: '1d ago' }
  ]);

  const [notifications] = useState([
    'Mehendi ceremony starts in 2 days',
    "Don't forget to pack your traditional attire",
    'Airport pickup schedule updated'
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-rose-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-orange-800">Namaste, {user.name}!</h1>
            <p className="text-orange-600">Welcome to your Indian Wedding Adventure Dashboard</p>
          </div>
          <Avatar src={user.avatar} alt={user.name} className="h-16 w-16 border-2 border-orange-500" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h2 className="text-sm font-medium text-orange-800">Total Guests</h2>
              <Users className="h-4 w-4 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-900">{stats.totalGuests}</div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h2 className="text-sm font-medium text-green-800">Confirmed RSVPs</h2>
              <Calendar className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-900">{stats.confirmedRSVPs}</div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h2 className="text-sm font-medium text-yellow-800">Pending RSVPs</h2>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-900">{stats.pendingRSVPs}</div>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h2 className="text-sm font-medium text-blue-800">Unread Messages</h2>
              <Mail className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-900">{stats.unreadMessages}</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <div>
              <h2 className="text-orange-800">Recent RSVPs</h2>
              <p className="text-sm text-orange-600">Latest updates on guest responses</p>
            </div>
            <ul className="space-y-4 mt-4">
              {recentRSVPs.map((rsvp, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <Avatar src={rsvp.avatar} alt={rsvp.name} className="h-8 w-8" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{rsvp.name}</p>
                    <Badge variant={rsvp.status === 'Confirmed' ? 'default' : rsvp.status === 'Pending' ? 'secondary' : 'destructive'}>
                      {rsvp.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <div>
              <h2 className="text-orange-800">Recent Messages</h2>
              <p className="text-sm text-orange-600">Stay updated with the latest communications</p>
            </div>
            <ul className="space-y-4 mt-4">
              {recentMessages.map((message, index) => (
                <li key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{message.sender}</p>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{message.message}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <div>
            <h2 className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-orange-600" />
              <span className="text-orange-800">Important Notifications</span>
            </h2>
          </div>
          <ul className="space-y-2 mt-4">
            {notifications.map((notification, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <p className="text-sm">{notification}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
