"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import DialogButton from "@/components/ui/DialogButton";
import { Progress } from "@/components/ui/progress";

// Sentiment analysis data
const chartData = [
  { sentiment: "Positive", count: 300, fill: "#31C436" }, // Green for positive
  { sentiment: "Neutral", count: 200, fill: "#FFD23F" },  // Yellow for neutral
  { sentiment: "Negative", count: 150, fill: "#FF331F" }, // Red for negative
];

// Configure chart with sentiment categories
const chartConfig = {
  visitors: {
    label: "Sentiments",
  },
  Positive: {
    label: "Positive",
    color: "#5EFC8D", // Green
  },
  Neutral: {
    label: "Neutral",
    color: "#F0CF65", // Yellow
  },
  Negative: {
    label: "Negative",
    color: "#F44336", // Red
  },
} satisfies ChartConfig;

export default function Component() {
  const totalSentiments = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);

  // Add scroll event listener to track scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); 
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`bg-white text-black py-4 px-6 fixed w-full top-0 left-0 z-10 transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="flex items-center px-4">
          {/* Logo and navigation items grouped together */}
          <div className="flex space-x-6 items-center">
            {/* Logo */}
            <div className="text-2xl font-bold pr-80">Logo</div>

            {/* Navigation links */}
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#home" className="hover:text-gray-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-500">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-500">
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>



      <div className="bg-gray-100 min-h-screen pt-20">
        {/* Dashboard Title */}
        <div className="px-8 py-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-4">
          
          {/* Sentiment Analysis Card */}
          <Card className="col-span-2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="sentiment"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {totalSentiments.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Total Responses
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Sentiment analysis for the last 6 months
              </div>
            </CardFooter>
          </Card>

          {/* Statistics Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Keyword Tracker</CardTitle>
              <CardDescription>Top Keywords Progress</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Example Keywords Data */}
              {[
                { keyword: "React", mentions: 120, percentage: 75 },
                { keyword: "JavaScript", mentions: 90, percentage: 60 },
                { keyword: "Next.js", mentions: 68, percentage: 45 },
                { keyword: "UI/UX", mentions: 45, percentage: 30 },
              ].map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span>{item.keyword}</span>
                    <span className="ml-2">{item.mentions}</span>
                  </div>
                  <Progress value={item.percentage} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Comments Section */}
        <div className="px-8 py-4">
          <CommentsCard />
        </div>
      </div>
    </>
  );
}

// Comments Card Component
function CommentsCard() {
  const dialogButtonsData = [
    {
      buttonText: "Feedback from John",
      imageSrc: "/profile-john.jpg",
      altText: "John's Profile",
      dialogTitle: "Feedback from John",
      fullText: "John shared some constructive feedback about your recent post.",
    },
    {
      buttonText: "Feedback from Jane",
      imageSrc: "/profile-jane.jpg",
      altText: "Jane's Profile",
      dialogTitle: "Feedback from Jane",
      fullText:
        "Jane appreciated your recent post and gave some thoughtful comments.",
    },
    {
      buttonText: "Feedback from Mike",
      imageSrc: "/profile-mike.jpg",
      altText: "Mike's Profile",
      dialogTitle: "Feedback from Mike",
      fullText: "Mike found your insights on the topic to be very helpful.",
    },
  ];

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>
          View your feedback from community members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {dialogButtonsData.map((buttonData, index) => (
          <div key={index} className="mb-4">
            <DialogButton
              buttonText={buttonData.buttonText}
              imageSrc={buttonData.imageSrc}
              altText={buttonData.altText}
              dialogTitle={buttonData.dialogTitle}
              fullText={buttonData.fullText}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-3</strong> of <strong>{dialogButtonsData.length}</strong> comments
        </div>
      </CardFooter>
    </Card>
  );
}
