import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  RefreshCw,
  FileText,
} from "lucide-react";
import QuizScore from "./score";
import QuizReview from "./quiz-overview";
import { Matching } from "@/lib/schemas";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type QuizProps = {
  questions: Matching[];
  clearPDF: () => void;
  title: string;
};

export default function MatchingComponent({
  questions,
  clearPDF,
  title = "Quiz",
}: QuizProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSubmit = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);

    const result = questions.map((question, index) => {
      return question.answer === answers[index]
    });

    const correctAnswersCount = result.filter(Boolean).length;
    setCorrectAnswer(correctAnswersCount);

    const percentageScore = (correctAnswersCount / questions.length) * 100;
    setScore(percentageScore);
  };

  const answerArray = useMemo(() => questions.map((question) => question.answer), [questions]);
  const mixedAnswerArray = useMemo(() => {
    const mixed = [...answerArray];

    for (let i = mixed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mixed[i], mixed[j]] = [mixed[j], mixed[i]];
    }

    return mixed
  }, [])


  const handleContentTypeChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const temp = [...prev];
      temp[index] = value;
      return temp;
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
          {title}
        </h1>
        <div className="min-h-[400px] flex flex-col gap-4">
          {" "}
          {isSubmitted && <Card>
            <CardContent className="p-4 text-center">
              <div className="text-4xl font-bold ">{`${score}`}</div>
              <div className="text-base font-light opacity-50">{`${correctAnswer} out of 4 correct`}</div>
              <div className="mt-4">{correctAnswer !== questions.length ? "Keep practicing, you'll get better!" : "Wonderfull!!!"}</div>
            </CardContent>
          </Card>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Card className="h-full flex flex-col justify-between">
                <CardTitle className="p-4 text-lg text-center">Questions</CardTitle>
                <CardContent>
                  <ul>
                    {questions.map((question, index) => {
                      return (
                        <li>{`Question${index + 1}: ${question.question}`}</li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
              <Card className="h-full flex flex-col justify-between">
                <CardTitle className="p-4 text-lg text-center ">Answers</CardTitle>
                <CardContent>
                  {mixedAnswerArray.map((answer, index) => {
                    return (
                      <div className="text-base">{`${index + 1}: ${answer}`}</div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
            <div className="flex w-full h-full">
              <Card className="p-4 w-full flex flex-col gap-4">
                <CardTitle className="text-base text-center">
                  Input Correct Answer Number
                </CardTitle>
                <CardContent className="h-full flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    {questions.map((_, index) => {
                      return (<div className="flex flex-row gap-2 text-center justify-center items-center">
                        <Label>{`Question${index + 1}:`} </Label>
                        <RadioGroup
                          value={answers[index]}
                          onValueChange={(value) => handleContentTypeChange(index, value)}
                          className="flex justify-center gap-4"
                          disabled={isSubmitted}
                        >
                          {mixedAnswerArray.map((answer, answerIndex) =>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={answer} id={`${index + 1}-${answerIndex + 1}`} />
                              <label htmlFor="quiz">{`${answerIndex + 1}`}</label>
                            </div>)}
                        </RadioGroup>
                      </div>)
                    })}
                  </div>
                  <div className="mt-4 flex flex-row gap-2 items-center justify-center">
                    <Button
                      variant='outline'
                      onClick={handleSubmit}>
                      {!isSubmitted ? "Submit" : "Reset"}
                    </Button>
                    <Button
                      onClick={clearPDF}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <FileText className="mr-2 h-4 w-4" /> Try Another PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
