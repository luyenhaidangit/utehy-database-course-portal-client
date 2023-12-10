const questionConstant = {
    types: [
        {
            key: 1,
            value: "Nhiều lựa chọn" 
        },
        {
            key: 2,
            value: "Nhiều đáp án" 
        },
        {
            key: 3,
            value: "Đúng/sai" 
        },
        {
            key: 4,
            value: "Điền vào chỗ trống" 
        }
    ],
    defaultQuestionAnswerMultipleAnswers: [
        {
            charIndex: "A",
            title: "",
            order: 4,
            isCorrect: true,
            score: 1
        },
        {
            charIndex: "B",
            title: "",
            order: 3,
            isCorrect: false,
            score: 1
        },
        {
            charIndex: "C",
            title: "",
            order: 2,
            isCorrect: false,
            score: 1
        },
        {
            charIndex: "D",
            title: "",
            order: 1,
            isCorrect: false,
            score: 1
        }
    ],
    typeScores: [
        {
            title: 'Điểm mặc định',
            value: 1
        },
        {
            title: 'Điểm tuỳ chỉnh',
            value: 2
        }
    ],
};
    
export default questionConstant;
    