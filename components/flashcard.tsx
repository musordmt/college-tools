import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
} from "lucide-react";
import { Flashcard } from "@/lib/schemas";
import { Card, CardContent, CardTitle } from "./ui/card";

type QuizProps = {
  questions: Flashcard[];
  clearPDF: () => void;
  title: string;
};

const QuestionCard: React.FC<{
  question: Flashcard;
}> = ({ question }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardTitle className="p-4 text-base text-center">
        {!show ? question.question : question.answer}
      </CardTitle>
      <CardContent className="mb-2 self-center">
        <Button variant={!show ? 'default' : 'outline'} size='lg' onClick={() => setShow(!show)}>{!show ? 'Show Answer' : 'Hide Answer'}</Button>
      </CardContent>
    </Card>
  );
};

export default function FlashcardComponent({
  questions,
  clearPDF,
  title = "FlashCard",
}: QuizProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-8 py-12 max-w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
          {title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 min-h-[400px]">
          {" "}
          {questions.map((question) => (
            <div className="space-y-4">
              <QuestionCard
                question={question}
              />
            </div>)
          )}
        </div>
        <div className="flex justify-center space-x-4 pt-4">
          <Button
            onClick={clearPDF}
            className="bg-primary hover:bg-primary/90 w-full sm:w-1/2"
          >
            <FileText className="mr-2 h-4 w-4" /> Try Another PDF
          </Button>
        </div>
      </main>
    </div>
  );
}
