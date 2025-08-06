
// components/ProfilePage.tsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation } from 'react-router';
import Orders from './Orders';
import UserReviews from './UserReviews';
import { assets } from '@/assets';

// Sample user data
const sampleUser = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254 712 345 678',
    address: 'Nairobi, Kenya',
    profileImage: assets.image1,
};




const Profile = () => {
    const [user, setUser] = useState(sampleUser);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(sampleUser);

    const location = useLocation();
    const initialTab = location.state?.tab || 'profile';

    const handleSave = () => {
        setUser(formData);
        setEditing(false);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Tabs defaultValue={initialTab}>
                <TabsList className="mb-6">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Profile Section */}
                <TabsContent value="profile">
                    <Card>
                        <CardContent className="flex flex-col md:flex-row gap-6 p-6">
                            <div className="shrink-0">
                                <img
                                    src={user.profileImage}
                                    alt="Profile"
                                    className="rounded-full h-28 w-28 object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-4">
                                {editing ? (
                                    <>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Full Name"
                                        />
                                        <Input
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Email"
                                        />
                                        <Input
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="Phone Number"
                                        />
                                        <Textarea
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Address"
                                        />
                                        <div className="flex gap-2">
                                            <button className='btn' onClick={handleSave}>Save</button>
                                            <button className='btn ' onClick={() => setEditing(false)}>Cancel</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p><strong>Name:</strong> {user.name}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Phone:</strong> {user.phone}</p>
                                        <p><strong>Address:</strong> {user.address}</p>
                                        <button className="mt-2 btn" onClick={() => setEditing(true)}> Edit</button>
                                    </>
                                )}
                                <button className="ml-6 mt-6 btn">Logout</button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Orders Section */}
                <TabsContent value="orders">
                    <Orders />
                </TabsContent>

                {/* Reviews Section */}
                <TabsContent value="reviews">
                    <UserReviews />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Profile;