import React from "react";

const testimonials = [
  {
    name: "Shweta Patel",
    role: "Learner, Web Development",
    message:
      "This platform helped me land my first internship. The courses and certificates are excellent!",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    name: "Amit Kumar",
    role: "Trainer, JavaScript",
    message:
      "As a trainer, I found the course creation tool easy to use. Love the UI and student engagement features.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Rina Das",
    role: "Learner, Data Science",
    message:
      "Interactive videos and regular exams kept me motivated. Highly recommend this LMS!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{testimonial.role}</p>
              <p className="text-gray-700 italic">"{testimonial.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
