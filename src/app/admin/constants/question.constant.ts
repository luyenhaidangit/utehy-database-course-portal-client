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
            isCorrect: true
        },
        {
            charIndex: "B",
            title: "",
            order: 3,
            isCorrect: false
        },
        {
            charIndex: "C",
            title: "",
            order: 2,
            isCorrect: false
        },
        {
            charIndex: "D",
            title: "",
            order: 1,
            isCorrect: false
        }
    ],
};
    
export default questionConstant;
    