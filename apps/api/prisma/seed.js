import { PrismaClient } from "@prisma/client";
import { hash, genSalt } from "bcrypt";

const prisma = new PrismaClient();

// Helper function to generate password hash
const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

async function main() {
  console.log("🌱 Starting to seed database...");

  // Clear existing data
  await prisma.messages.deleteMany({});
  await prisma.reviews.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.gig.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 Cleared existing data");

  // Create Users
  const users = await Promise.all([
    // Sellers
    prisma.user.create({
      data: {
        email: "john@fx.com",
        password: await generatePassword("password123"),
        username: "johndoefx",
        fullName: "John Doe",
        description:
          "Professional web developer with 5+ years of experience in React, Node.js, and modern web technologies.",
        profileImage:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "sarah@fx.com",
        password: await generatePassword("password123"),
        username: "sarahwilsonfx",
        fullName: "Sarah Wilson",
        description:
          "Creative graphic designer specializing in brand identity, logos, and digital marketing materials.",
        profileImage:
          "https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "mike@fx.com",
        password: await generatePassword("password123"),
        username: "mikechenfx",
        fullName: "Mike Chen",
        description:
          "Digital marketing expert with expertise in SEO, social media marketing, and content strategy.",
        profileImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "emily@fx.com",
        password: await generatePassword("password123"),
        username: "emilyrodriguezfx",
        fullName: "Emily Rodriguez",
        description:
          "Professional content writer and copywriter with expertise in blog posts, web copy, and marketing content.",
        profileImage:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "david@fx.com",
        password: await generatePassword("password123"),
        username: "davidkimfx",
        fullName: "David Kim",
        description:
          "Mobile app developer specializing in React Native and Flutter development for iOS and Android.",
        profileImage:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "james@fx.com",
        password: await generatePassword("password123"),
        username: "jameswilsonfx",
        fullName: "James Wilson",
        description:
          "Expert video editor and motion graphics artist with a passion for storytelling.",
        profileImage:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
    // Buyers
    prisma.user.create({
      data: {
        email: "alice@fx.com",
        password: await generatePassword("password123"),
        username: "alicejohnsonfx",
        fullName: "Alice Johnson",
        description: "Small business owner looking for digital solutions.",
        profileImage:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "robert@fx.com",
        password: await generatePassword("password123"),
        username: "robertbrownfx",
        fullName: "Robert Brown",
        description: "Startup founder seeking creative and technical services.",
        profileImage:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "lisa@fx.com",
        password: await generatePassword("password123"),
        username: "lisagarciafx",
        fullName: "Lisa Garcia",
        description: "Marketing manager at a growing company.",
        profileImage:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "linda@fx.com",
        password: await generatePassword("password123"),
        username: "lindamartinezfx",
        fullName: "Linda Martinez",
        description: "E-commerce entrepreneur looking for branding and dev work.",
        profileImage:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        isProfileInfoSet: true,
      },
    }),
  ]);

  console.log("👥 Created users");

  // Create Gigs
  const gigs = await Promise.all([
    // Web Development Gigs
    prisma.gig.create({
      data: {
        title: "I will create a responsive React website for your business",
        description:
          "I will build a modern, responsive website using React.js with clean code and best practices. The website will be fully responsive, SEO-optimized, and include contact forms, animations, and modern design elements.",
        shortDesc: "Professional React website with responsive design",
        category: "Web Development",
        deliveryTime: 7,
        revisions: 3,
        features: [
          "Responsive Design",
          "React.js",
          "SEO Optimized",
          "Contact Form",
          "Modern UI/UX",
        ],
        price: 300,
        images: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=600&fit=crop",
        ],
        userId: users[0].id,
      },
    }),
    prisma.gig.create({
      data: {
        title: "I will develop a full-stack web application with Node.js and MongoDB",
        description:
          "Complete full-stack web application development using Node.js, Express.js, and MongoDB. Includes user authentication, CRUD operations, API development, and deployment setup.",
        shortDesc: "Full-stack web app with Node.js and MongoDB",
        category: "Web Development",
        deliveryTime: 14,
        revisions: 5,
        features: [
          "Node.js Backend",
          "MongoDB Database",
          "REST API",
          "User Authentication",
          "Deployment Ready",
        ],
        price: 600,
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
        ],
        userId: users[0].id,
      },
    }),
    // Design Gigs
    prisma.gig.create({
      data: {
        title: "I will design a professional logo and brand identity",
        description:
          "Complete brand identity design including logo design, color palette, typography selection, and brand guidelines. You will receive multiple logo variations and all source files.",
        shortDesc: "Professional logo and brand identity design",
        category: "Graphic Design",
        deliveryTime: 5,
        revisions: 5,
        features: [
          "Custom Logo Design",
          "Brand Guidelines",
          "Color Palette",
          "Typography",
          "Source Files",
        ],
        price: 150,
        images: [
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
        ],
        userId: users[1].id,
      },
    }),
    prisma.gig.create({
      data: {
        title: "I will create stunning social media graphics and posts",
        description:
          "Custom social media graphics for Instagram, Facebook, Twitter, and LinkedIn. Includes post designs, story templates, and promotional graphics that align with your brand.",
        shortDesc: "Custom social media graphics and post designs",
        category: "Graphic Design",
        deliveryTime: 3,
        revisions: 3,
        features: [
          "Instagram Posts",
          "Story Templates",
          "Facebook Graphics",
          "Brand Consistency",
          "Multiple Formats",
        ],
        price: 80,
        images: [
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
        ],
        userId: users[1].id,
      },
    }),
    // Digital Marketing Gigs
    prisma.gig.create({
      data: {
        title: "I will optimize your website for SEO and improve search rankings",
        description:
          "Complete SEO audit and optimization service including keyword research, on-page optimization, technical SEO fixes, and monthly reporting to improve your search engine rankings.",
        shortDesc: "Complete SEO optimization and ranking improvement",
        category: "Digital Marketing",
        deliveryTime: 10,
        revisions: 2,
        features: [
          "SEO Audit",
          "Keyword Research",
          "On-page Optimization",
          "Technical SEO",
          "Monthly Reports",
        ],
        price: 200,
        images: [
          "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1553830591-42e4fd7035ec?w=800&h=600&fit=crop",
        ],
        userId: users[2].id,
      },
    }),
    // Writing Gigs
    prisma.gig.create({
      data: {
        title: "I will write engaging blog posts and articles for your website",
        description:
          "High-quality, SEO-optimized blog posts and articles tailored to your niche. Includes keyword research, engaging content, and proper formatting for web publishing.",
        shortDesc: "SEO-optimized blog posts and article writing",
        category: "Writing & Translation",
        deliveryTime: 5,
        revisions: 2,
        features: [
          "SEO Optimized",
          "Keyword Research",
          "Engaging Content",
          "Proper Formatting",
          "Plagiarism Free",
        ],
        price: 90,
        images: [
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
        ],
        userId: users[3].id,
      },
    }),
    // Mobile Development Gigs
    prisma.gig.create({
      data: {
        title: "I will develop a cross-platform mobile app with React Native",
        description:
          "Professional mobile app development using React Native for both iOS and Android platforms. Includes user authentication, API integration, and app store deployment assistance.",
        shortDesc: "Cross-platform mobile app with React Native",
        category: "Mobile Development",
        deliveryTime: 21,
        revisions: 3,
        features: [
          "React Native",
          "iOS & Android",
          "User Authentication",
          "API Integration",
          "App Store Ready",
        ],
        price: 900,
        images: [
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        ],
        userId: users[4].id,
      },
    }),
    // Video Animation Gigs
    prisma.gig.create({
      data: {
        title: "I will edit your youtube videos professionally",
        description:
          "Professional video editing for YouTube, including cuts, transitions, color grading, and sound design. I will make your videos engaging and high-quality.",
        shortDesc: "Professional YouTube video editing",
        category: "Video & Animation",
        deliveryTime: 5,
        revisions: 3,
        features: [
          "Professional Cuts",
          "Color Grading",
          "Sound Design",
          "Transitions",
          "1080p/4K Export",
        ],
        price: 120,
        images: [
          "https://images.unsplash.com/photo-1574717432722-a0f9c27d2a97?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?w=800&h=600&fit=crop",
        ],
        userId: users[5].id,
      },
    }),
  ]);

  console.log("💼 Created gigs");

  // Create Orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        buyerId: users[6].id, // Alice Johnson
        gigId: gigs[0].id, // React website
        paymentIntent: "pi_test_1234567890123456789",
        price: 30000, // Price in cents
        isCompleted: true,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: users[7].id, // Robert Brown
        gigId: gigs[2].id, // Logo design
        paymentIntent: "pi_test_2345678901234567890",
        price: 15000,
        isCompleted: true,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: users[8].id, // Lisa Garcia
        gigId: gigs[4].id, // SEO optimization
        paymentIntent: "pi_test_3456789012345678901",
        price: 20000,
        isCompleted: false,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: users[6].id, // Alice Johnson
        gigId: gigs[3].id, // Social media graphics
        paymentIntent: "pi_test_4567890123456789012",
        price: 8000,
        isCompleted: true,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: users[7].id, // Robert Brown
        gigId: gigs[5].id, // Blog writing
        paymentIntent: "pi_test_5678901234567890123",
        price: 9000,
        isCompleted: true,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: users[9].id, // Linda Martinez
        gigId: gigs[7].id, // Video editing
        paymentIntent: "pi_test_6789012345678901234",
        price: 12000,
        isCompleted: true,
      },
    }),
  ]);

  console.log("📋 Created orders");

  // Create Reviews
  const reviews = await Promise.all([
    prisma.reviews.create({
      data: {
        rating: 5,
        comment:
          "Excellent work! The website looks amazing and is exactly what I wanted. John was very professional and delivered on time.",
        gigId: gigs[0].id,
        reviewerId: users[6].id, // Alice Johnson
      },
    }),
    prisma.reviews.create({
      data: {
        rating: 5,
        comment:
          "Outstanding logo design! Sarah understood my vision perfectly and created a beautiful brand identity.",
        gigId: gigs[2].id,
        reviewerId: users[7].id, // Robert Brown
      },
    }),
    prisma.reviews.create({
      data: {
        rating: 4,
        comment:
          "Great social media graphics! Very creative and professional. Will definitely work with Sarah again.",
        gigId: gigs[3].id,
        reviewerId: users[6].id, // Alice Johnson
      },
    }),
    prisma.reviews.create({
      data: {
        rating: 5,
        comment:
          "Emily wrote fantastic blog posts that really engage our audience. Highly recommended!",
        gigId: gigs[5].id,
        reviewerId: users[7].id, // Robert Brown
      },
    }),
    prisma.reviews.create({
      data: {
        rating: 5,
        comment:
          "James did an amazing job with the video editing. The transitions were smooth and the pacing was perfect.",
        gigId: gigs[7].id,
        reviewerId: users[9].id, // Linda Martinez
      },
    }),
  ]);

  console.log("⭐ Created reviews");

  // Create Messages
  const messages = await Promise.all([
    prisma.messages.create({
      data: {
        text: "Hi! I have some questions about the website project. Can we discuss the requirements in detail?",
        senderId: users[6].id, // Alice Johnson
        receiverId: users[0].id, // John Doe
        orderId: orders[0].id,
        isRead: true,
      },
    }),
    prisma.messages.create({
      data: {
        text: "Of course! I'd be happy to discuss the project details. What specific features are you looking for?",
        senderId: users[0].id, // John Doe
        receiverId: users[6].id, // Alice Johnson
        orderId: orders[0].id,
        isRead: true,
      },
    }),
    prisma.messages.create({
      data: {
        text: "I need the website to have a contact form, photo gallery, and about page. Is that possible within the timeline?",
        senderId: users[6].id, // Alice Johnson
        receiverId: users[0].id, // John Doe
        orderId: orders[0].id,
        isRead: false,
      },
    }),
    prisma.messages.create({
      data: {
        text: "Thank you for the beautiful logo design! I love how it turned out.",
        senderId: users[7].id, // Robert Brown
        receiverId: users[1].id, // Sarah Wilson
        orderId: orders[1].id,
        isRead: true,
      },
    }),
    prisma.messages.create({
      data: {
        text: "I'm so glad you love it! It was a pleasure working on your brand identity.",
        senderId: users[1].id, // Sarah Wilson
        receiverId: users[7].id, // Robert Brown
        orderId: orders[1].id,
        isRead: true,
      },
    }),
    prisma.messages.create({
      data: {
        text: "Hi James, I have some raw footage I need edited for a YouTube vlog. Are you available?",
        senderId: users[9].id, // Linda Martinez
        receiverId: users[5].id, // James Wilson
        orderId: orders[5].id,
        isRead: true,
      },
    }),
  ]);

  console.log("💬 Created messages");

  console.log("✅ Seeding completed successfully!");
  console.log(`
  📊 Database seeded with:
  - ${users.length} users (6 sellers, 4 buyers)
  - ${gigs.length} gigs across different categories
  - ${orders.length} orders (some completed, some in progress)
  - ${reviews.length} reviews
  - ${messages.length} messages
  
  🔐 Test login credentials:
  Sellers:
  - john@fx.com / password123
  - sarah@fx.com / password123
  - mike@fx.com / password123
  - emily@fx.com / password123
  - david@fx.com / password123
  - james@fx.com / password123
  
  Buyers:
  - alice@fx.com / password123
  - robert@fx.com / password123
  - lisa@fx.com / password123
  - linda@fx.com / password123
  `);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
