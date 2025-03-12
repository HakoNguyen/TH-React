import { UndoOutlined } from '@ant-design/icons';
import { InputNumber, message, Typography, Button, Space } from 'antd';
import { useState } from 'react';
const GuessNumber = () => {
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string>('');
    const [attempts, setAttempts] = useState<number>(0);
    const [guessedNumbers, setGuessedNumbers] = useState<number[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { Title } = Typography;

    const handleGuess = () => {
        if (gameOver || guess === null) return;
        if (guess < 1 || guess > 100) {
            messageApi.open({
                type: 'error',
                content: 'Vui lòng nhập số trong khoảng từ 1 đến 100!',
            });
            return;
        }
        if (guessedNumbers.includes(guess)) {
            messageApi.open({
                type: 'warning',
                content: 'Bạn đã đoán số này rồi!',
            });
            return;
        }
        setAttempts(attempts + 1);
        setGuessedNumbers([...guessedNumbers, guess]);
        if (guess < randomNumber) {
            messageApi.open({
                type: 'error',
                content: `Bạn đoán quá thấp! Số lượt: ${attempts + 1}/10`,
            });
        } else if (guess > randomNumber) {
            messageApi.open({
                type: 'error',
                content: `Bạn đoán quá cao! Số lượt: ${attempts + 1}/10`,
            });
        } else {
            messageApi.open({
                type: 'success',
                content: 'Chúc mừng bạn đã đoán đúng!',
            });
            setGameOver(true);
            alert('Chúc mừng bạn đã đoán đúng!');
        }
        if (attempts >= 9 && guess !== randomNumber) {
            messageApi.open({
                type: 'error',
                content: `Bạn đã hết lượt! Số đúng là ${randomNumber}.`,
            });
            setGameOver(true);
            alert(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
        }
        setGuess(null); 
    };

    const handleInputChange = (value: number | null) => {
        if (value !== null && value > 100) {
            messageApi.open({
                type: 'error',
                content: 'Vui lòng nhập số trong khoảng từ 1 đến 100!',
            });
            setGuess(null);
        } else {
            setGuess(value);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleGuess();
        }
    };

    const resetGame = () => {
        setRandomNumber(Math.floor(Math.random() * 100) + 1);
        setGuess(null);
        setFeedback('');
        setAttempts(0);
        setGuessedNumbers([]);
        setGameOver(false);
    };

    return (
        <div style={{ textAlign: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: 16, borderRadius: 8, backgroundColor:"white" }}>
            {contextHolder}
            <Title>Guess Number</Title>
            <Space>
            <InputNumber
                min={1}
                max={100}
                value={guess ?? undefined}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={gameOver}
            />
                </Space>
            <Button type="primary" onClick={handleGuess} style={{ marginLeft: 8 }} disabled={gameOver}>
                Check
            </Button>
            <Button type="default" onClick={resetGame} style={{ marginLeft: 8 }}>
                <UndoOutlined />
            </Button>
            <p>Attempts: {attempts}/10</p>
            <div>
                <h2>Failed Numbers:</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {guessedNumbers.map((num, index) => (
                        <li key={index}>Lượt {index + 1}: {num}</li>
                    ))}
                </ul>
            </div>
            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default GuessNumber;