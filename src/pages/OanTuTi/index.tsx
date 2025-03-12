import { Button, Card, List, Typography } from 'antd';
import { useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { message } from 'antd';


const { Title, Paragraph } = Typography;

const choices = [
	{ name: 'Búa', icon: '✊' },
	{ name: 'Bao', icon: '🖐️' },
	{ name: 'Kéo', icon: '✌️' }
];

const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)].name;

const determineWinner = (playerChoice: string, computerChoice: string): string => {
	if (playerChoice === computerChoice) return 'Hòa';
	if (
		(playerChoice === 'Búa' && computerChoice === 'Kéo') ||
		(playerChoice === 'Bao' && computerChoice === 'Búa') ||
		(playerChoice === 'Kéo' && computerChoice === 'Bao')
	) {
		return 'You win';
        message.open({
            type: 'success',
            content: 'Bạn đã thắng!',
        });
	}
	return 'Super AI wins';
};

const OanTuTi = () => {
	const [playerChoice, setPlayerChoice] = useState<string | null>(null);
	const [computerChoice, setComputerChoice] = useState<string | null>(null);
	const [result, setResult] = useState<string | null>(null);
	const [history, setHistory] = useState<string[]>([]);
	const [playerScore, setPlayerScore] = useState<number>(0);
	const [computerScore, setComputerScore] = useState<number>(0);

	const handlePlayerChoice = (choice: string) => {
		const computerMove = getRandomChoice();
		const gameResult = determineWinner(choice, computerMove);

		setPlayerChoice(choice);
		setComputerChoice(computerMove);
		setResult(gameResult);
		setHistory([...history, gameResult]);

		if (gameResult === 'You win') {
			setPlayerScore(playerScore + 1);
			message.open({
				type: 'success',
				content: 'Bạn đã thắng!',
			});
		} 
        else if (gameResult === 'Super AI wins') {
			setComputerScore(computerScore + 1);
			message.open({
				type: 'error',
				content: 'Bạn đã thua!',
			});
		}
        else {
			message.open({
				type: 'info',
				content: 'Hòa!',
			});
		}
	};

	const handleReset = () => {
		setPlayerChoice(null);
		setComputerChoice(null);
		setResult(null);
		setHistory([]);
		setPlayerScore(0);
		setComputerScore(0);
	};

	return (
		<div style={{ maxWidth: 800, margin: '80px auto', textAlign: 'center' }}>
			<Title level={2}>Kéo Búa Bao</Title>
			<Card style={{ padding: 20, fontSize: '1.5rem' }}>
				{choices.map((choice) => (
					<Button key={choice.name} onClick={() => handlePlayerChoice(choice.name)} style={{ margin: '5px',  }}>
						{choice.icon} 
					</Button>
				))}
			</Card>

			{playerChoice && computerChoice && (
				<Card style={{ marginTop: 20 }}>
					<Paragraph>
						Lượt của bạn: <strong>{playerChoice}</strong>
					</Paragraph>
					<Paragraph>
						Lượt của Super AI: <strong>{computerChoice}</strong>
					</Paragraph>
					<Paragraph>
						Kết quả: <strong>{result}</strong>
					</Paragraph>
					<Paragraph>
						Điểm của bạn: <strong>{playerScore}</strong> - Điểm của Super AI: <strong>{computerScore}</strong>
					</Paragraph>
				</Card>
			)}

			<Title level={3}>Lịch sử</Title>
			<List dataSource={history} renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>} />

			<Button onClick={handleReset} type="primary" icon={<ReloadOutlined />} style={{ marginTop: 20 }}>
				
			</Button>
		</div>
	);
};

export default OanTuTi;