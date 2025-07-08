'use client';
import Image from 'next/image';
import React, { useState } from 'react';
export const mockPosts = [
  {
    id: 'p1',
    title: 'Getting Started with React Hooks',
    excerpt:
      'Learn the basics of React Hooks and how to use them in your projects.',
    date: '2023-06-15',
  },
  {
    id: 'p2',
    title: 'Advanced Tailwind CSS Techniques',
    excerpt:
      'Take your Tailwind CSS skills to the next level with these advanced techniques.',
    date: '2023-07-22',
  },
  {
    id: 'p3',
    title: 'Building a Full-Stack Application with NextJS',
    excerpt:
      'A comprehensive guide to building full-stack applications with NextJS.',
    date: '2023-08-10',
  },
  {
    id: 'p4',
    title: 'Introduction to TypeScript for React Developers',
    excerpt:
      'Learn how to use TypeScript with React to build more robust applications.',
    date: '2023-09-05',
  },
  {
    id: 'p5',
    title: 'Responsive Design Best Practices',
    excerpt:
      'Ensure your websites look great on all devices with these responsive design best practices.',
    date: '2023-10-18',
  },
];
// Mock data for reviews
export const mockReviews = [
  {
    id: 'r1',
    postId: 'p1',
    username: 'Sarah Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 5,
    date: '2023-06-16',
    content:
      "This article was extremely helpful! I've been struggling with understanding hooks, but your explanations made it click for me. Thank you so much!",
    status: 'approved',
  },
  {
    id: 'r2',
    postId: 'p1',
    username: 'Michael Chen',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    date: '2023-06-17',
    content:
      'Good overview of hooks. Would have liked more complex examples, but overall a solid introduction.',
    status: 'approved',
  },
  {
    id: 'r3',
    postId: 'p1',
    username: 'Alex Turner',
    userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 2,
    date: '2023-06-18',
    content:
      "Too basic. Didn't cover any advanced use cases which I was hoping for.",
    status: 'rejected',
  },
  {
    id: 'r4',
    postId: 'p1',
    username: 'Jessica Williams',
    userAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    rating: 5,
    date: '2023-06-19',
    content:
      "Perfect timing! I was just starting to learn React and this article explained hooks so clearly. Can't wait for more content!",
    status: 'approved',
  },
  {
    id: 'r5',
    postId: 'p1',
    username: 'David Miller',
    userAvatar: 'https://randomuser.me/api/portraits/men/57.jpg',
    rating: 3,
    date: '2023-06-20',
    content:
      'Decent article but had some inaccuracies regarding useEffect cleanup functions.',
    status: 'pending',
  },
  {
    id: 'r6',
    postId: 'p2',
    username: 'Emma Wilson',
    userAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    rating: 5,
    date: '2023-07-23',
    content:
      "Amazing article! I've been using Tailwind for a while but learned several new tricks. The section on custom plugins was especially helpful.",
    status: 'approved',
  },
  {
    id: 'r7',
    postId: 'p2',
    username: 'James Brown',
    userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4,
    date: '2023-07-24',
    content:
      'Solid advice on optimizing Tailwind for production. Would recommend to anyone using Tailwind in serious projects.',
    status: 'approved',
  },
  {
    id: 'r8',
    postId: 'p2',
    username: 'Sophia Garcia',
    userAvatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    rating: 1,
    date: '2023-07-25',
    content:
      'This is just promoting utility-first CSS which is a terrible approach. We should be using proper CSS modules!',
    status: 'rejected',
  },
  {
    id: 'r9',
    postId: 'p3',
    username: 'William Taylor',
    userAvatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    rating: 5,
    date: '2023-08-11',
    content:
      'Comprehensive and well-explained. I followed along and built my first full-stack NextJS app thanks to this guide!',
    status: 'approved',
  },
  {
    id: 'r10',
    postId: 'p3',
    username: 'Olivia Martinez',
    userAvatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    rating: 4,
    date: '2023-08-12',
    content:
      'Great tutorial, but I had some issues with the database connection part. Would appreciate more troubleshooting tips.',
    status: 'pending',
  },
  {
    id: 'r11',
    postId: 'p4',
    username: 'Daniel Lee',
    userAvatar: 'https://randomuser.me/api/portraits/men/59.jpg',
    rating: 5,
    date: '2023-09-06',
    content:
      'Finally an article that explains TypeScript in React in a way that makes sense! The type inference examples were particularly useful.',
    status: 'approved',
  },
  {
    id: 'r12',
    postId: 'p4',
    username: 'Ava Robinson',
    userAvatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    rating: 3,
    date: '2023-09-07',
    content:
      'Helpful but moves a bit too quickly through complex concepts. Would benefit from more step-by-step explanations.',
    status: 'pending',
  },
  {
    id: 'r13',
    postId: 'p5',
    username: 'Ethan Clark',
    userAvatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    rating: 5,
    date: '2023-10-19',
    content:
      "This article saved me so much time! The media query strategies are brilliant and I've already implemented them in my current project.",
    status: 'approved',
  },
  {
    id: 'r14',
    postId: 'p5',
    username: 'Isabella Scott',
    userAvatar: 'https://randomuser.me/api/portraits/women/56.jpg',
    rating: 4,
    date: '2023-10-20',
    content:
      'Good overview of responsive design principles. The case studies were particularly insightful.',
    status: 'approved',
  },
  {
    id: 'r15',
    postId: 'p5',
    username: 'Noah Adams',
    userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    rating: 2,
    date: '2023-10-21',
    content:
      "Nothing new here that hasn't been covered in countless other articles about responsive design.",
    status: 'pending',
  },
];
export const ReviewManagement = () => {
  const [selectedPostId, setSelectedPostId] = useState(mockPosts[0].id);
  const postReviews = mockReviews.filter(
    (review) => review.postId === selectedPostId
  );
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            key={i}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  return (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-gray-200 border-b p-6">
          <div>
            <label
              className="mb-1 block font-medium text-gray-700 text-sm"
              htmlFor="post-selector"
            >
              Select Post
            </label>
            <select
              className="block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              id="post-selector"
              onChange={(e) => setSelectedPostId(e.target.value)}
              value={selectedPostId}
            >
              {mockPosts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {postReviews.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No reviews for this post yet.
            </div>
          ) : (
            postReviews.map((review) => (
              <div className="p-6 hover:bg-gray-50" key={review.id}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24">
                      <Image
                        alt={review.username}
                        className="h-full w-full rounded-full object-cover"
                        height={100}
                        src={
                          review.userAvatar ||
                          `https://ui-avatars.com/api/?name=${review.username}&background=random`
                        }
                        width={100}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-lg">
                      {review.username}
                    </p>
                    <p className="text-gray-500 text-sm md:text-lg">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                    <div className="mt-1">{renderStars(review.rating)}</div>
                    <p className="mt-2 text-gray-700 text-sm md:text-lg">
                      {review.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
