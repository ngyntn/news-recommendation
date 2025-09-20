import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import rehypeRaw from "rehype-raw";
import { Heart  } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const news = [
    {
        newsId: "1038393253",
        title: "Fronto Reaches 10k Users",
        date: "2023-06-10",
        createdBy: "Hoang Huu Nam",
        likeCount: 12300,
        content: `
# Fronto Reaches 10k Users: The innovative social networking platform

**Fronto**, the innovative social networking platform, has officially reached a significant milestone: **10,000 active users** as of June 2023. This achievement marks a pivotal moment for the startup, which has been gaining traction for its unique approach to fostering meaningful online connections. Launched just 18 months ago, Fronto has quickly become a go-to platform for users seeking authentic interactions in an increasingly crowded digital space.

## The Journey to 10k Users

Fronto’s journey began with a simple yet ambitious vision: to create a platform that prioritizes *user-driven communities* over algorithm-driven content feeds. Unlike traditional social media giants, Fronto emphasizes **privacy**, **transparency**, and **user control**. The platform allows users to customize their feeds, join niche communities, and engage in real-time discussions without the clutter of advertisements or manipulative algorithms.

The road to 10,000 users was not without challenges. In its early days, Fronto faced skepticism from investors who doubted the viability of a privacy-first social platform in a market dominated by ad-driven models. However, the team, led by founder *Hoang Huu Nam*, remained steadfast in their mission. “We wanted to build something that respects users’ time and data while fostering genuine connections,” Nam said in a recent interview.

### Key Features Driving Growth

Fronto’s success can be attributed to several standout features:

- **Customizable Communities**: Users can create and join communities based on specific interests, from *sustainable living* to *blockchain technology*. These communities are moderated by users, ensuring high-quality discussions.
- **Privacy-First Design**: Fronto does not track user data for advertising purposes, a decision that has resonated with privacy-conscious users.
- **Real-Time Interaction**: The platform’s live chat and discussion forums allow users to engage in meaningful conversations without the noise of traditional social media.
- **Gamified Engagement**: Fronto rewards active users with badges, exclusive content, and early access to new features, encouraging consistent participation.

These features have helped Fronto carve out a niche in the competitive social media landscape. According to the company, 60% of its users are aged 18–34, with significant growth in regions like Southeast Asia, North America, and Europe.

## Community Feedback

The response from users has been overwhelmingly positive. *Anna Tran*, a 25-year-old graphic designer from Hanoi, shared her experience: “Fronto feels like a breath of fresh air. I can connect with people who share my passions without worrying about my data being sold. The communities are vibrant, and I’ve made real friends here.”

Similarly, *James Carter*, a tech enthusiast from San Francisco, praised the platform’s intuitive design: “It’s so easy to navigate, and I love that I can control what I see. No more endless scrolling through irrelevant ads.”

## Challenges and Opportunities

Despite its success, Fronto faces challenges as it scales. Maintaining a high-quality user experience while onboarding thousands of new users is no small feat. The company has invested heavily in server infrastructure to ensure smooth performance and is exploring partnerships with local organizations to expand its community outreach.

Additionally, Fronto is navigating the complex regulatory landscape of data privacy. With regulations like GDPR in Europe and similar laws emerging globally, the platform’s commitment to privacy positions it well but requires constant vigilance to remain compliant.

## Looking Ahead

Fronto’s team is already planning the next phase of growth. In the coming months, the platform will roll out new features, including:

- **Enhanced Mobile App**: A revamped app with improved performance and new functionalities, such as voice-based communities.
- **Creator Tools**: Features to help content creators monetize their work without relying on ads, such as subscription-based content and tipping systems.
- **Global Expansion**: Plans to localize the platform in additional languages to reach new markets.

“We’re just getting started,” said Nam. “Our goal is to reach 100,000 users by mid-2024 while staying true to our core values. We believe that social media can be a force for good, and we’re committed to proving it.”

## A Bright Future

Fronto’s milestone of 10,000 users is more than just a number—it’s a testament to the growing demand for platforms that prioritize user experience and privacy. As the digital world becomes more complex, Fronto’s commitment to simplicity, authenticity, and community sets it apart.

For now, the team is celebrating this achievement with their users. A virtual event is planned for next month, featuring live discussions, giveaways, and a sneak peek at upcoming features. As Fronto continues to grow, one thing is clear: this is only the beginning.

*Join the Fronto community today and be part of the next 10,000 users shaping the future of social media.*
    `
    },
    {
        newsId: "1038393254",
        title: "AI-Powered Startup Zest Raises $5M in Seed Funding",
        date: "2023-07-15",
        createdBy: "Le Thi Minh",
        likeCount: 900,
        content: `
# AI-Powered Startup Zest Raises $5M in Seed Funding

**Zest**, an AI-driven platform revolutionizing personalized learning, announced today that it has secured **$5 million** in seed funding. The round was led by *VentureWave Capital* and included participation from several prominent angel investors in the edtech space. This funding marks a significant step forward for the startup, which aims to transform how students and professionals acquire new skills in a rapidly changing world.

## The Vision Behind Zest

Founded in 2022 by *Le Thi Minh*, Zest leverages advanced artificial intelligence to create tailored learning paths for users. Whether you’re a student preparing for exams, a professional upskilling for a new career, or a hobbyist exploring a new field, Zest’s AI adapts to your learning style, pace, and goals. The platform combines **machine learning**, **natural language processing**, and **behavioral analytics** to deliver a highly personalized experience.

“Education is not one-size-fits-all,” said Minh. “Our mission is to make learning accessible, engaging, and effective for everyone. With this funding, we’re one step closer to achieving that vision.”

## How Zest Works

Zest’s platform operates on a simple yet powerful premise: learning should be as unique as the individual. Here’s how it works:

1. **Personalized Assessments**: Users complete an initial quiz to assess their current knowledge, learning preferences, and goals.
2. **Custom Learning Paths**: The AI generates a tailored curriculum, pulling from a vast library of resources, including videos, articles, quizzes, and interactive exercises.
3. **Real-Time Feedback**: The platform tracks progress and adjusts the learning path in real time, ensuring users stay challenged but not overwhelmed.
4. **Community Support**: Zest connects users with mentors and peers for collaborative learning and motivation.

The platform supports a wide range of subjects, from *coding* and *data science* to *creative writing* and *language learning*. Its flexibility has made it popular among diverse audiences, including high school students, working professionals, and lifelong learners.

## The Funding Round

The $5 million seed round will fuel Zest’s growth in several key areas:

- **Product Development**: Enhancing the AI engine to support more subjects and integrate new technologies, such as virtual reality for immersive learning.
- **Team Expansion**: Hiring top talent in AI, education, and product design to accelerate development.
- **Market Expansion**: Launching marketing campaigns to reach new users in Asia, Europe, and North America.

VentureWave Capital’s managing partner, *Sarah Nguyen*, expressed excitement about the investment: “Zest is redefining personalized education. Their AI-driven approach is not only innovative but also scalable, with the potential to impact millions of learners worldwide.”

## Early Success and User Stories

Since its beta launch six months ago, Zest has attracted over **5,000 users** across 20 countries. Early adopters have praised the platform’s ability to make learning engaging and efficient. *Mark Lee*, a software engineer from Singapore, shared: “Zest helped me learn Python in just three months. The AI kept me on track, and the community forums were incredibly supportive.”

Similarly, *Aisha Khan*, a high school student from London, said: “I used Zest to prepare for my math exams, and it made complex topics so much easier to understand. I actually enjoyed studying!”

## Challenges Ahead

As Zest scales, it faces challenges common to edtech startups. Ensuring content quality across diverse subjects, maintaining user engagement, and competing with established players like Coursera and Khan Academy are no small tasks. However, Minh remains optimistic: “Our focus on personalization and AI gives us a unique edge. We’re not just another e-learning platform—we’re a learning companion.”

## The Road to Impact

With the new funding, Zest plans to double its user base by the end of 2023 and expand its content library to include more niche subjects, such as *sustainable agriculture* and *artificial intelligence ethics*. The company is also exploring partnerships with universities and corporations to offer accredited courses and employee training programs.

“We want to empower people to learn anything, anywhere, at any time,” said Minh. “This funding is a vote of confidence in our vision, and we’re excited to make it a reality.”

*Ready to start your learning journey? Sign up for Zest today and experience education tailored to you.*
    `
    },
    {
        newsId: "1038393255",
        title: "GreenWave Launches Eco-Friendly App for Sustainable Living",
        date: "2023-08-20",
        createdBy: "Tran Van Khoa",
        likeCount: 1200,
        content: `
# GreenWave Launches Eco-Friendly App for Sustainable Living

**GreenWave**, a startup dedicated to promoting sustainable lifestyles, has launched its flagship mobile app, designed to help users reduce their environmental footprint. The app, which went live on August 20, 2023, has already garnered **2,000 downloads** in its first week, signaling strong interest in eco-conscious solutions.

## A Mission to Make Sustainability Accessible

Founded by *Tran Van Khoa*, GreenWave aims to make sustainable living practical and achievable for everyone. The app provides tools, resources, and community support to help users adopt eco-friendly habits without sacrificing convenience. “Sustainability shouldn’t feel like a chore,” said Khoa. “Our goal is to empower people to make small, impactful changes in their daily lives.”

## Key Features of the GreenWave App

The GreenWave app is packed with features to guide users toward a greener lifestyle:

- **Carbon Footprint Tracker**: Users can input their daily activities—such as transportation, food choices, and energy usage—to calculate their carbon footprint.
- **Eco Challenges**: Fun, gamified challenges encourage users to adopt habits like reducing plastic use, composting, or switching to renewable energy.
- **Sustainable Marketplace**: The app connects users with eco-friendly brands and products, from reusable straws to solar-powered gadgets.
- **Community Hub**: A built-in forum allows users to share tips, ask questions, and connect with like-minded individuals.

The app’s user-friendly interface and actionable insights have made it a hit among environmentally conscious consumers, particularly millennials and Gen Z.

## Early Traction and Impact

Since its launch, GreenWave has seen strong engagement, with users logging an average of **15 minutes per day** on the app. Early data shows that users who complete the app’s eco challenges have reduced their carbon footprints by an average of **10%** within the first month.

*Lisa Nguyen*, a 30-year-old teacher from Ho Chi Minh City, shared her experience: “GreenWave makes it so easy to live sustainably. The carbon tracker showed me how much my daily commute was impacting the environment, so I switched to biking twice a week.”

## Challenges in the Sustainability Space

While GreenWave’s launch has been successful, the startup faces challenges in scaling its impact. Educating users about sustainability, competing with larger eco-platforms, and ensuring the affordability of eco-friendly products are key hurdles. However, Khoa believes the app’s focus on community and gamification sets it apart.

## Future Plans

GreenWave has ambitious plans for the future, including:

- **Global Expansion**: Localizing the app for new markets, with a focus on Southeast Asia and Europe.
- **Corporate Partnerships**: Collaborating with businesses to offer employee sustainability programs.
- **AI Integration**: Adding AI-driven recommendations to personalize the user experience further.

“We’re building a movement,” said Khoa. “Sustainability is a collective effort, and GreenWave is here to make it fun, accessible, and impactful.”

*Download the GreenWave app today and start your journey toward a greener future.*
    `
    },
    {
        newsId: "1038393256",
        title: "CodeZap: Empowering the Next Generation of Coders",
        date: "2023-09-05",
        createdBy: "Pham Minh Tuan",
        likeCount: 1200,
        content: `
# CodeZap: Empowering the Next Generation of Coders

**CodeZap**, an online coding academy for kids and teens, has officially launched its platform, offering interactive programming courses for young learners. Founded by *Pham Minh Tuan*, CodeZap aims to make coding accessible and fun for students aged 8–18, equipping them with skills for the digital age.

## Why Coding Matters

In today’s tech-driven world, coding is more than just a skill—it’s a gateway to opportunity. From building apps to designing games, coding empowers young people to create, innovate, and solve problems. CodeZap’s mission is to demystify coding and make it approachable for beginners, regardless of their background.

“Our goal is to inspire the next generation of tech leaders,” said Tuan. “We believe every child should have the chance to learn coding in a fun, supportive environment.”

## What Sets CodeZap Apart

CodeZap stands out in the crowded edtech market with its unique approach:

- **Interactive Lessons**: Courses combine videos, quizzes, and hands-on projects to keep students engaged.
- **Game-Based Learning**: Students learn by building their own games and apps, making the process fun and rewarding.
- **Mentorship Program**: Experienced coders provide one-on-one guidance to help students overcome challenges.
- **Affordable Pricing**: CodeZap offers flexible subscription plans to make coding education accessible to families worldwide.

The platform currently offers courses in **Python**, **JavaScript**, **HTML/CSS**, and **Scratch**, with plans to add more languages in the future.

## Early Success Stories

Since its soft launch three months ago, CodeZap has enrolled **1,500 students** from 15 countries. Parents and students alike have praised the platform’s engaging approach. *Emily Tran*, a 12-year-old student from Sydney, said: “I built my first game on CodeZap, and it was so cool to see my code come to life!”

*David Pham*, a parent from Hanoi, added: “CodeZap has sparked my son’s interest in technology. He’s more confident and excited about learning now.”

## Challenges and Opportunities

Scaling an online education platform comes with challenges, including ensuring consistent quality across courses and reaching underserved communities. CodeZap is addressing these by partnering with schools and nonprofits to offer free access to low-income students.

## The Road Ahead

With its recent launch, CodeZap is focused on expanding its course offerings and building a global community of young coders. Upcoming initiatives include:

- **Advanced Courses**: Introducing topics like artificial intelligence and cybersecurity for older students.
- **Teacher Training**: Providing resources for educators to integrate coding into their classrooms.
- **Global Competitions**: Hosting coding hackathons to encourage creativity and collaboration.

“Coding is the language of the future,” said Tuan. “We’re here to help kids speak it fluently.”

*Enroll your child in CodeZap today and give them a head start in the world of tech.*
    `
    },
    {
        newsId: "1038393257",
        title: "HealthSync: Revolutionizing Telemedicine with AI",
        date: "2023-10-01",
        createdBy: "Nguyen Thi Lan",
        likeCount: 1200,
        content: `
# HealthSync: Revolutionizing Telemedicine with AI

**HealthSync**, a telemedicine startup leveraging artificial intelligence, has launched its platform to make healthcare more accessible and efficient. Founded by *Nguyen Thi Lan*, HealthSync connects patients with doctors through a seamless, AI-powered interface that streamlines diagnostics and consultations.

## The Need for Accessible Healthcare

Access to quality healthcare remains a challenge for millions worldwide. Long wait times, high costs, and geographic barriers often prevent people from getting timely care. HealthSync addresses these issues by combining **telemedicine** with **AI-driven diagnostics** to deliver fast, affordable, and accurate healthcare solutions.

“Our vision is to make healthcare a right, not a privilege,” said Lan. “With HealthSync, we’re bringing medical expertise to your fingertips.”

## How HealthSync Works

HealthSync’s platform is designed to be intuitive and effective:

- **AI Symptom Checker**: Users input their symptoms, and the AI provides a preliminary assessment, guiding them to the right specialist.
- **Virtual Consultations**: Patients can book video calls with licensed doctors in minutes.
- **Health Records Integration**: The platform securely stores and organizes medical records for easy access.
- **Personalized Health Plans**: AI-generated recommendations help users manage chronic conditions and improve overall wellness.

The platform supports consultations in multiple specialties, including **general medicine**, **pediatrics**, **mental health**, and **dermatology**.

## Early Adoption and Impact

Since its beta launch in early 2023, HealthSync has facilitated over **10,000 consultations** across 12 countries. Patients have praised the platform’s ease of use and affordability. *Maria Le*, a 40-year-old mother from Manila, shared: “I used HealthSync to consult a doctor for my daughter’s fever. It was quick, and the doctor was so helpful.”

## Challenges in Telemedicine

HealthSync operates in a competitive and highly regulated industry. Ensuring compliance with healthcare laws, maintaining patient privacy, and building trust with users are ongoing challenges. However, the company’s focus on AI and user experience gives it a competitive edge.

## Future Innovations

HealthSync has big plans for the future, including:

- **Wearable Integration**: Syncing with devices like smartwatches to monitor vital signs in real time.
- **AI-Powered Diagnostics**: Expanding the AI’s capabilities to detect early signs of conditions like diabetes and heart disease.
- **Global Reach**: Partnering with local healthcare providers to expand into underserved regions.

“We’re just scratching the surface of what’s possible,” said Lan. “Our goal is to make HealthSync a trusted name in healthcare worldwide.”

*Experience healthcare redefined. Sig up for HealthSync today.*
    `
    }
];

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center py-3">
            <div className="min-h-screen flex flex-col items-center py-20">
                {news.map((item, index) => (
                    <NewsCard key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

const NewsCard = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [likeCount, setLikeCount] = useState(item.likeCount || 0); // Khởi tạo likeCount từ item hoặc 0
    const [userReaction, setUserReaction] = useState(null); // null: chưa phản ứng, "like": đã like, "dislike": đã dislike
    const contentRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (contentRef.current) {
            setIsOverflowing(
                contentRef.current.scrollHeight > contentRef.current.clientHeight
            );
        }
    }, []);

    // Xử lý khi nhấn Like
    const handleLike = () => {
        if (userReaction === "like") {
            // Nếu đã like, bỏ like
            setLikeCount(likeCount - 1);
            setUserReaction(null);
        } else {
            // Chưa phản ứng, thêm like
            setLikeCount(likeCount + 1);
            setUserReaction("like");
        }
    };

    const convertLikeNumber = (likeCount) => {
        if (likeCount < 1000) return likeCount.toString();
        if (likeCount < 1_000_000) return (likeCount / 1000).toFixed(1).replace(/\.0$/, '') + "K";
        return (likeCount / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + "B";
    };

    const handleOnClickTitle = (newsId) => {
        navigate(`/news/${newsId}`);
    };


    // Sanitize Markdown-rendered HTML to prevent XSS
    const sanitizedContent = DOMPurify.sanitize(item.content);

    return (
        <div className="bg-white border px-10 py-6 m-4 rounded-xl shadow-sm max-w-5xl w-full font-geist">
            <div className="flex justify-between items-start">
                <div>
                    <h2 
                    className="text-xl font-bold mb-1 hover:cursor-pointer hover:underline"
                    onClick={() => handleOnClickTitle(item.newsId)}
                    
                    >{item.title}</h2>
                    <p className="text-sm text-gray-500 mb-4">
                         {item.createdBy} • {item.date}
                    </p>
                </div>
                <div className="flex items-center space-x-2 px-2">
                    
                    <button
                        onClick={handleLike}
                        className={`text-sm font-medium ${userReaction === "like" ? "text-red-600" : "text-gray-600"
                            } hover:text-red-600 transition-colors`}
                        title="Like">
                        <Heart  className="w-5 h-5" />
                    </button>
                    <p className="text-sm text-gray-600">{convertLikeNumber(likeCount)}</p>
                </div>
            </div>

            {/* Content wrapper with max-height */}
            <div
                ref={contentRef}
                className={`relative transition-all duration-300 prose prose-sm max-w-none leading-relaxed [&>p]:mb-4 ${isExpanded ? "max-h-none" : "max-h-[60vh] overflow-hidden"
                    }`}
            >
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {sanitizedContent}
                </ReactMarkdown>

                {/* Gradient to indicate hidden content */}
                {!isExpanded && isOverflowing && (
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
            </div>

            {/* Read More button */}
            {isOverflowing && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 text-sm font-semibold text-indigo-800 hover:"
                >
                    {isExpanded ? "Thu gọn" : "Đọc thêm"}
                </button>
            )}
        </div>
    );
};


export default Home;