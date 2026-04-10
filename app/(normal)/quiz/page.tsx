"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/const/globalconst";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const [quizData, setQuizData] = React.useState(quizQuestions[0]);
  const [answers, setAnswers] = React.useState<{ [key: number]: number }>({});

  const changeQuiz = (quizId: any) => {
    if (quizQuestions.length > quizId) {
      setQuizData(quizQuestions[quizId]);
    } else {
      toast.success("Quiz Completed!");
    }
  };

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    changeQuiz(questionId);
  };

  const BackHandler = () => {
    if (quizData?.id > 1) {
      changeQuiz(quizData?.id - 2);
    }
  };

  const NextHandler = () => {
    if (quizData?.id < quizQuestions.length) {
      changeQuiz(quizData?.id);
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl my-5 md:my-0 bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col gap-8">
        {/* Progress */}
        <Field className="w-full">
          <FieldLabel className="flex justify-between text-sm text-gray-600">
            <span>
              Question {quizData?.id} of {quizQuestions.length}
            </span>
            <span>
              {Math.round((quizData?.id / quizQuestions.length) * 100)}%
            </span>
          </FieldLabel>
          <Progress
            value={(answers[quizQuestions.length] ? 100 : (quizData.id - 1) * (100 / quizQuestions.length))}
            className="bg-[#168BA0]/50 [&>div]:bg-[#168BA0]"
            id="progress-upload"
          />
        </Field>

        {/* Question */}
        <div className="text-center">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
            {quizData?.question}
          </h1>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quizData?.options.map((option: any, index: number) => {
            const Icon = option.icon;

            return (
              <Button
                onClick={() => handleOptionClick(quizData?.id, index)}
                key={index}
                className={`flex items-center gap-4 justify-start p-4 h-auto rounded-xl
                transition-all ${answers[quizData?.id] === index
                    ? "bg-[#168BA0] text-white"
                    : " bg-[#9DD8E2] hover:bg-[#168BA0] text-white"
                  }`}
              >
                <div className="p-2 bg-white rounded-lg text-[#168BA0]">
                  <Icon size={20} />
                </div>
                <span className="font-medium">{option.label}</span>
              </Button>
            );
          })}
        </div>

        <div className={`w-full flex items-center justify-between ${quizData?.id == 1 && "justify-end"}`}>
          {quizData?.id > 1 && (
            <Button onClick={() => BackHandler()} variant={"ghost"}>
              <ArrowLeft /> Back
            </Button>
          )}

          {quizData?.id < quizQuestions.length && (
            <Button onClick={() => NextHandler()} variant={"ghost"}>
              Next <ArrowRight />
            </Button>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Your answers help us recommend the perfect products for your needs
        </p>
      </div>
    </div>
  );
};

export default Page;
