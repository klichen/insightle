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

  const feedbackText =
    "Add feedback here Add feedback here Add feedback here Add feedback here Add feedback here Add feedback here Add feedback here Add feedback here Add feedback here Add feedback here";

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
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="text-2xl font-bold">My Website</div>
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="hover:text-gray-500">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-500">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Card containing the chart */}
      <Card className="flex flex-col mx-8 mt-16 max-w-lg">
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

      {/* Comments Component placed here */}
      <div className="my-6 mx-8">
        <CommentsCard />
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
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>
          View your feedback from community members.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {dialogButtonsData.map((buttonData, index) => (
          <div key={index} className="mb-4">
            {/* Added margin-bottom */}
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
