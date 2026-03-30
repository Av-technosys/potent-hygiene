// // "use client";
// // import { Button } from "@/components/ui/button";
// // import { Field, FieldLabel } from "@/components/ui/field";
// // import { Progress } from "@/components/ui/progress";
// // // import { Button, Field, FieldLabel, Progress } from "@/components/ui/button";
// // import { quizQuestions } from "@/const/globalconst";
// // import { Icon } from "lucide-react";
// // import React from "react";
// // import { toast } from "sonner";

// // const Page = () => {
// //   const [quizData, setQuizData] = React.useState(quizQuestions[0]);

// //   const changeQuiz = (quizId: any) => {
// //     if (quizQuestions.length > quizId) {
// //       setQuizData(quizQuestions[quizId]);
// //     } else {
// //       toast.success("Quiz Completed!");
// //     }
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto border border-black flex flex-col items-center gap-8 p-8">
// //      <div>
// //          <Field className="w-full ">
// //         <FieldLabel htmlFor="progress-upload">
// //           <span>Question {quizData?.id} of {quizQuestions.length}</span>
// //           <span className="ml-auto">{quizData?.id / quizQuestions.length * 100}%</span>
// //         </FieldLabel>
// //         <Progress value={quizData?.id / quizQuestions.length * 100} id="progress-upload" />
// //       </Field>
// //      </div>

// //       <div>
// //         <h1>{quizData?.question}</h1>
// //         {quizData?.options.map((option: any, index: number) => {
// //           const Icon = option.icon; // 👈 important

// //           return (
// //             <Button onClick={() => changeQuiz(quizData?.id)} key={index}>
// //               <Icon />
// //               <span>{option.label}</span>
// //             </Button>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Page;




// "use client";

// import { Button } from "@/components/ui/button";
// import { Field, FieldLabel } from "@/components/ui/field";
// import { Progress } from "@/components/ui/progress";
// import { quizQuestions } from "@/const/globalconst";
// import React from "react";
// import { toast } from "sonner";

// const Page = () => {
//   const [currentIndex, setCurrentIndex] = React.useState(0);
//   const [selected, setSelected] = React.useState(null);

//   const quizData = quizQuestions[currentIndex];

//   const changeQuiz = () => {
//     if (quizQuestions.length > currentIndex + 1) {
//       setCurrentIndex((prev) => prev + 1);
//       setSelected(null);
//     } else {
//       toast.success("Quiz Completed!");
//     }
//   };

//   const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 md:p-10 flex flex-col gap-8">

//         {/* Progress */}
//         <Field className="w-full">
//           <FieldLabel className="flex justify-between text-sm text-gray-600">
//             <span>
//               Question {currentIndex + 1} of {quizQuestions.length}
//             </span>
//             <span>{Math.round(progress)}%</span>
//           </FieldLabel>
//           <Progress value={progress} />
//         </Field>

//         {/* Question */}
//         <div className="text-center">
//           <h1 className="text-xl md:text-3xl font-semibold">
//             {quizData?.question}
//           </h1>
//         </div>

//         {/* Options */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {quizData?.options.map((option, index) => {
//             const Icon = option.icon;
//             const isActive = selected === index;

//             return (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setSelected(index:any);
//                   setTimeout(() => changeQuiz(), 500);
//                 }}
//                 className={`flex items-center gap-4 p-4 rounded-xl border transition-all
//                 ${
//                   isActive
//                     ? "bg-teal-700 text-white"
//                     : "bg-teal-100 text-teal-800 hover:bg-teal-200"
//                 }`}
//               >
//                 <div
//                   className={`p-2 rounded-lg bg-white ${
//                     isActive ? "text-teal-700" : "text-teal-500"
//                   }`}
//                 >
//                   <Icon size={20} />
//                 </div>

//                 <span className="font-medium">{option.label}</span>
//               </button>
//             );
//           })}
//         </div>

//         {/* Footer text */}
//         <p className="text-center text-sm text-gray-500">
//           Your answers help us recommend the perfect products for your needs
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Page;



"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/const/globalconst";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const [quizData, setQuizData] = React.useState(quizQuestions[0]);

  const changeQuiz = (quizId: any) => {
    if (quizQuestions.length > quizId) {
      setQuizData(quizQuestions[quizId]);
    } else {
      toast.success("Quiz Completed!");
    }
  };

  const BackHandler=()=>{
    if(quizData?.id>1){
      changeQuiz(quizData?.id - 2);
    }
  }

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
            value={(quizData?.id / quizQuestions.length) * 100}
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
                onClick={() => changeQuiz(quizData?.id)}
                key={index}
                className="flex items-center gap-4 justify-start p-4 h-auto rounded-xl
                bg-[#168BA0] hover:bg-[#168BA0]/60 text-white transition-all"
              >
                <div className="p-2 bg-white rounded-lg text-[#168BA0]">
                  <Icon size={20} />
                </div>
                <span className="font-medium">{option.label}</span>
              </Button>
            );
          })}
          <div>
            <Button onClick={()=>BackHandler()} variant={"ghost"}><ArrowLeft/> Back</Button>
          </div>
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