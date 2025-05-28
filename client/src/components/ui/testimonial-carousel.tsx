import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  institution: string;
  content: string;
  rating: number;
  type: 'student' | 'teacher' | 'parent';
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus, 8th Grade",
    role: "Student",
    institution: "Roosevelt Middle School",
    content: "EduLearn Pro makes learning so much fun! The adaptive quizzes help me understand math better, and I love earning badges for my achievements.",
    rating: 5,
    type: 'student'
  },
  {
    id: 2,
    name: "Ms. Rodriguez",
    role: "5th Grade Teacher",
    institution: "Lincoln Elementary School",
    content: "The smart reporting feature has revolutionized how I track student progress. I can identify learning gaps immediately and provide targeted support.",
    rating: 5,
    type: 'teacher',
    featured: true
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Parent",
    institution: "Parent of 3rd Grader",
    content: "The bilingual support has been incredible for our family. My daughter can learn in both English and Spanish, which has boosted her confidence tremendously.",
    rating: 5,
    type: 'parent'
  }
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 ${
                  testimonial.featured ? 'border-2 border-blue-500 transform scale-105' : ''
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                    <div className="flex text-amber-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 italic mb-4">"{testimonial.content}"</p>
                <div className="text-sm text-slate-500">{testimonial.institution}</div>
                {testimonial.featured && (
                  <div className="mt-3 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full inline-block">
                    Featured Review
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
        
        {/* Dots */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-slate-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-slate-600" />
        </button>
      </div>
    </div>
  );
}
