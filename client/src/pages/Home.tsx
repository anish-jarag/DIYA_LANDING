import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  GraduationCap, 
  Brain, 
  Globe, 
  Shield, 
  BarChart3, 
  Play, 
  Check, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Star,
  Menu,
  X,
  Award,
  University,
  Smartphone,
  Lock,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';
import { SmoothScrollLink } from '@/components/ui/smooth-scroll-link';
import { apiRequest } from '@/lib/queryClient';
import { insertContactSchema, insertNewsletterSchema } from '@shared/schema';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Contact form
  const contactForm = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      school: '',
      role: '',
      studentCount: '',
      message: '',
    },
  });

  // Newsletter form
  const newsletterForm = useForm({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  // Contact mutation
  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Demo Requested Successfully!",
        description: "We'll contact you within 24 hours to schedule your personalized demo.",
      });
      contactForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Newsletter mutation
  const newsletterMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/newsletter', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive our latest updates and educational insights.",
      });
      newsletterForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: any) => {
    contactMutation.mutate(data);
  };

  const onNewsletterSubmit = (data: any) => {
    newsletterMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="text-2xl text-blue-600" />
              <span className="text-xl font-bold text-slate-900">DIYA EduLearn</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <SmoothScrollLink href="#features" className="text-slate-700 hover:text-blue-600 transition-colors">
                Features
              </SmoothScrollLink>
              <SmoothScrollLink href="#demo" className="text-slate-700 hover:text-blue-600 transition-colors">
                Demo
              </SmoothScrollLink>
              <SmoothScrollLink href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors">
                Reviews
              </SmoothScrollLink>
              <SmoothScrollLink href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors">
                Contact
              </SmoothScrollLink>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Request Demo
              </Button>
            </div>

            <button 
              className="md:hidden text-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden border-t border-slate-200 py-4 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <SmoothScrollLink href="#features" className="block text-slate-700 hover:text-blue-600 transition-colors">
                Features
              </SmoothScrollLink>
              <SmoothScrollLink href="#demo" className="block text-slate-700 hover:text-blue-600 transition-colors">
                Demo
              </SmoothScrollLink>
              <SmoothScrollLink href="#testimonials" className="block text-slate-700 hover:text-blue-600 transition-colors">
                Reviews
              </SmoothScrollLink>
              <SmoothScrollLink href="#contact" className="block text-slate-700 hover:text-blue-600 transition-colors">
                Contact
              </SmoothScrollLink>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Request Demo
              </Button>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-600 to-green-600 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6">
                <Award className="text-amber-400 mr-2" size={16} />
                <span className="text-sm font-medium">Government Approved • COPPA Compliant</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Adaptive Learning That <span className="text-amber-400">Grows</span> With Every Student
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Revolutionary educational technology platform with AI-powered adaptive learning, comprehensive bilingual support, and advanced anti-cheat protection for K-12 students.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-600">
                  <Play className="mr-2" size={20} />
                  Watch Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Start Free Trial
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 mt-8 text-blue-100">
                <div className="flex items-center">
                  <Check className="text-amber-400 mr-2" size={16} />
                  <span>100% Free for Schools</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="text-amber-400 mr-2" size={16} />
                  <span>FERPA Compliant</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rounded-2xl shadow-2xl bg-white p-8 relative overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <GraduationCap size={64} className="text-blue-600 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">Interactive Learning Platform</p>
                  </div>
                </div>
              </div>
              
              {/* Floating stats cards */}
              <motion.div 
                className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-slate-600">Student Engagement</div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="text-2xl font-bold text-green-600">2.5x</div>
                <div className="text-sm text-slate-600">Learning Speed</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-slate-600">Trusted by over 50,000 schools nationwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <University className="mx-auto text-3xl text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-600">Dept. of Education</p>
            </div>
            <div className="text-center">
              <Award className="mx-auto text-3xl text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-600">COPPA Certified</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="mx-auto text-3xl text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-600">FERPA Compliant</p>
            </div>
            <div className="text-center">
              <Star className="mx-auto text-3xl text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-600">EdTech Award 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powerful Features Built for Modern Learning
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform adapts to each student's unique learning style, providing personalized education experiences that drive real results.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Adaptive Learning",
                description: "AI-powered algorithms adjust difficulty and pace in real-time based on student performance and learning patterns.",
                features: ["Personalized learning paths", "Real-time difficulty adjustment", "Learning style analysis"],
                color: "blue"
              },
              {
                icon: Globe,
                title: "Bilingual Support",
                description: "Comprehensive multilingual platform supporting seamless transitions between languages for diverse learners.",
                features: ["15+ language options", "Cultural context integration", "Native pronunciation guides"],
                color: "green"
              },
              {
                icon: Shield,
                title: "Anti-Cheat Protection",
                description: "Advanced security measures ensure academic integrity while maintaining a smooth learning experience.",
                features: ["Browser lockdown mode", "Behavioral analytics", "Plagiarism detection"],
                color: "amber"
              },
              {
                icon: BarChart3,
                title: "Smart Reports",
                description: "Comprehensive analytics and insights for teachers, parents, and administrators to track progress.",
                features: ["Real-time dashboards", "Predictive analytics", "Custom report builder"],
                color: "slate"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full hover:shadow-xl transition-shadow border-l-4 ${
                  feature.color === 'blue' ? 'border-l-blue-500' :
                  feature.color === 'green' ? 'border-l-green-500' :
                  feature.color === 'amber' ? 'border-l-amber-500' :
                  'border-l-slate-500'
                }`}>
                  <CardContent className="p-8">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                      feature.color === 'blue' ? 'bg-blue-100' :
                      feature.color === 'green' ? 'bg-green-100' :
                      feature.color === 'amber' ? 'bg-amber-100' :
                      'bg-slate-100'
                    }`}>
                      <feature.icon className={`text-xl ${
                        feature.color === 'blue' ? 'text-blue-600' :
                        feature.color === 'green' ? 'text-green-600' :
                        feature.color === 'amber' ? 'text-amber-600' :
                        'text-slate-600'
                      }`} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 mb-6">{feature.description}</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="text-green-600 mr-2" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">See DIYA EduLearn in Action</h2>
            <p className="text-xl text-slate-600">Explore our intuitive interface designed for students, teachers, and parents</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Student Dashboard",
                features: ["Personalized learning dashboard", "Progress tracking and achievements", "Interactive lessons and quizzes"]
              },
              {
                title: "Teacher Interface",
                features: ["Comprehensive class management", "Assignment creation and grading", "Student analytics and insights"]
              },
              {
                title: "Mobile Experience",
                features: ["Full-featured mobile apps", "Offline learning capabilities", "Cross-device synchronization"]
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
                <div className="aspect-video rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                  <div className="text-center">
                    <Smartphone size={48} className="text-blue-600 mx-auto mb-4" />
                    <p className="text-slate-600">{item.title} Preview</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-slate-600">
                      <Check className="text-green-600 mr-3" size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Demo Video Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-100 p-12 relative overflow-hidden">
              <CardContent className="relative z-10">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Watch Our Platform Demo</h3>
                <p className="text-slate-600 mb-8">See how DIYA EduLearn transforms the learning experience in just 3 minutes</p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Play className="mr-3" size={20} />
                  Play Demo Video
                </Button>
              </CardContent>
              <div className="absolute inset-0 opacity-10">
                <Play className="text-6xl text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={96} />
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-slate-600">Trusted by students, teachers, and parents nationwide</p>
          </motion.div>
          
          <TestimonialCarousel />

          {/* Stats Section */}
          <motion.div 
            className="grid md:grid-cols-4 gap-8 mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[
              { number: "50,000+", label: "Schools Using Platform", color: "blue" },
              { number: "2.5M+", label: "Students Engaged", color: "green" },
              { number: "98%", label: "Teacher Satisfaction", color: "amber" },
              { number: "45%", label: "Improvement in Scores", color: "slate" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`text-3xl font-bold mb-2 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'amber' ? 'text-amber-600' :
                  'text-slate-700'
                }`}>
                  {stat.number}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter & Mobile App Download */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Newsletter Signup */}
            <motion.div 
              className="text-white"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Stay Connected with DIYA EduLearn</h2>
              <p className="text-blue-100 text-lg mb-8">
                Get the latest updates on new features, educational insights, and special offers for schools and districts.
              </p>
              
              <Form {...newsletterForm}>
                <form onSubmit={newsletterForm.handleSubmit(onNewsletterSubmit)} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <FormField
                      control={newsletterForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input 
                              placeholder="Enter your email address" 
                              className="text-slate-900 placeholder-slate-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit"
                      disabled={newsletterMutation.isPending}
                      className="bg-amber-500 text-slate-900 hover:bg-amber-600"
                    >
                      {newsletterMutation.isPending ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </div>
                  <div className="flex items-center text-sm text-blue-100">
                    <ShieldCheck className="mr-2" size={16} />
                    <span>We respect your privacy. Unsubscribe anytime.</span>
                  </div>
                </form>
              </Form>
            </motion.div>

            {/* Mobile App Download */}
            <motion.div 
              className="text-white"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Download Our Mobile Apps</h3>
              <p className="text-blue-100 mb-6">
                Take learning anywhere with our full-featured mobile applications for students and teachers.
              </p>
              
              <div className="space-y-4">
                <a href="#" className="flex items-center bg-black text-white rounded-lg p-4 hover:bg-gray-800 transition-colors">
                  <Smartphone className="text-2xl mr-4" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </a>
                
                <a href="#" className="flex items-center bg-black text-white rounded-lg p-4 hover:bg-gray-800 transition-colors">
                  <Smartphone className="text-2xl mr-4" />
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
              
              <div className="mt-6 text-blue-100 text-sm">
                <Smartphone className="inline mr-2" size={16} />
                Compatible with iOS 12+ and Android 8+
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Demo Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to Transform Your School?</h2>
            <p className="text-xl text-slate-600">Schedule a personalized demo and see how DIYA EduLearn can revolutionize learning at your institution</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div 
              className="bg-slate-50 rounded-2xl p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Request Your Demo</h3>
              
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={contactForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={contactForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School/Organization *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="principal">Principal/Administrator</SelectItem>
                            <SelectItem value="it_director">IT Director</SelectItem>
                            <SelectItem value="district_admin">District Administrator</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="studentCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Students</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select student count" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-50">1-50 students</SelectItem>
                            <SelectItem value="51-200">51-200 students</SelectItem>
                            <SelectItem value="201-500">201-500 students</SelectItem>
                            <SelectItem value="501-1000">501-1000 students</SelectItem>
                            <SelectItem value="1000+">1000+ students</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your educational goals and any specific questions you have..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700" 
                    size="lg"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? 'Scheduling...' : 'Schedule Demo'}
                  </Button>
                  
                  <p className="text-sm text-slate-600 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </Form>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Phone Support</h4>
                      <p className="text-slate-600">1-800-EDU-LEARN (338-5327)</p>
                      <p className="text-sm text-slate-500">Monday - Friday, 8 AM - 6 PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Email Support</h4>
                      <p className="text-slate-600">support@diyaedlearn.com</p>
                      <p className="text-sm text-slate-500">24/7 response within 2 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <GraduationCap className="text-amber-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Training & Onboarding</h4>
                      <p className="text-slate-600">Free setup and training included</p>
                      <p className="text-sm text-slate-500">Dedicated success manager assigned</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="aspect-video rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap size={64} className="text-blue-600 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">Students Collaborating</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="text-2xl text-blue-400" />
                <span className="text-xl font-bold">DIYA EduLearn</span>
              </div>
              <p className="text-slate-400">
                Empowering education through innovative technology and adaptive learning solutions for the next generation.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">COPPA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FERPA Information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 DIYA EduLearn. All rights reserved. | Proudly supporting education nationwide.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-slate-400">
              <div className="flex items-center">
                <ShieldCheck className="text-green-400 mr-2" size={16} />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center">
                <Lock className="text-blue-400 mr-2" size={16} />
                <span>256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
