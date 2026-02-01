import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../ui/PageTransition';

const NotFound = () => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(localStorage.getItem('snakeHighScore') || 0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Game constants
    const GRID_SIZE = 20;
    const SPEED = 100;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let direction = { x: 0, y: 0 };
        let gameLoop;
        let lastRenderTime = 0;

        const resizeCanvas = () => {
            canvas.width = Math.min(window.innerWidth - 40, 400);
            canvas.height = Math.min(window.innerWidth - 40, 400);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const drawGrid = () => {
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i <= canvas.width; i += GRID_SIZE) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            for (let i = 0; i <= canvas.height; i += GRID_SIZE) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }
        };

        const draw = () => {
            ctx.fillStyle = '#050510';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawGrid();

            // Draw Snake
            snake.forEach((segment, index) => {
                ctx.fillStyle = index === 0 ? '#00FFFF' : 'rgba(0, 255, 255, 0.6)';
                ctx.shadowBlur = index === 0 ? 15 : 0;
                ctx.shadowColor = '#00FFFF';
                ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
                ctx.shadowBlur = 0;
            });

            // Draw Food
            ctx.fillStyle = '#FF00FF';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#FF00FF';
            ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
            ctx.shadowBlur = 0;
        };

        const update = () => {
            if (gameOver || !gameStarted) return;

            const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

            // Wall collision (wrap around)
            const cols = Math.floor(canvas.width / GRID_SIZE);
            const rows = Math.floor(canvas.height / GRID_SIZE);

            if (head.x < 0) head.x = cols - 1;
            if (head.x >= cols) head.x = 0;
            if (head.y < 0) head.y = rows - 1;
            if (head.y >= rows) head.y = 0;

            // Self collision
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                handleGameOver();
                return;
            }

            snake.unshift(head);

            // Eat food
            if (head.x === food.x && head.y === food.y) {
                setScore(s => {
                    const newScore = s + 10;
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem('snakeHighScore', newScore);
                    }
                    return newScore;
                });
                food = {
                    x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)),
                    y: Math.floor(Math.random() * (canvas.height / GRID_SIZE))
                };
            } else {
                snake.pop();
            }
        };

        const handleGameOver = () => {
            setGameOver(true);
            setGameStarted(false);
            direction = { x: 0, y: 0 };
        };

        const loop = (currentTime) => {
            if (gameOver) return;
            window.requestAnimationFrame(loop);
            const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
            if (secondsSinceLastRender < 1 / (SPEED / 10)) return; // Control speed

            lastRenderTime = currentTime;
            update(); // Logic is tied to frame rate here, simple but effective for snake
            draw();
        };

        // Input handling
        const handleKey = (e) => {
            if (!gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                setGameStarted(true);
                setGameOver(false);
                setScore(0);
                snake = [{ x: 10, y: 10 }];
            }

            switch (e.key) {
                case 'ArrowUp': if (direction.y !== 1) direction = { x: 0, y: -1 }; break;
                case 'ArrowDown': if (direction.y !== -1) direction = { x: 0, y: 1 }; break;
                case 'ArrowLeft': if (direction.x !== 1) direction = { x: -1, y: 0 }; break;
                case 'ArrowRight': if (direction.x !== -1) direction = { x: 1, y: 0 }; break;
            }
        };

        window.addEventListener('keydown', handleKey);

        // Start loop
        const interval = setInterval(() => {
            if (gameStarted && !gameOver) {
                update();
                draw();
            } else {
                draw(); // Just draw static state
            }
        }, 100);

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [gameStarted, gameOver]);

    return (
        <main className="section" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h1 className="heading-lg neon-pink" style={{ fontSize: '4rem', marginBottom: '10px' }}>404</h1>
            <p className="text-body" style={{ marginBottom: '30px' }}>Page Not Found. But you found a game!</p>

            <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', display: 'inline-block' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                    <span>Score: <b style={{ color: 'var(--neon-cyan)' }}>{score}</b></span>
                    <span>High Score: <b style={{ color: 'var(--neon-purple)' }}>{highScore}</b></span>
                </div>

                <canvas
                    ref={canvasRef}
                    style={{ border: '2px solid rgba(255,255,255,0.1)', borderRadius: '10px', background: '#050510', cursor: 'pointer' }}
                    onClick={() => {
                        if (gameOver) {
                            setGameOver(false);
                            setGameStarted(true);
                            setScore(0);
                        } else if (!gameStarted) {
                            setGameStarted(true);
                        }
                    }}
                />

                <p style={{ marginTop: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {gameOver ?
                        <span style={{ color: 'var(--neon-pink)' }}>GAME OVER! Click or arrow keys to restart.</span> :
                        gameStarted ? "Use Arrow Keys to Move" : "Press Arrow Keys to Start"}
                </p>
            </div>

            <Link to="/" className="btn btn-primary" style={{ marginTop: '40px' }}>
                Return Home
            </Link>
        </main>
    );
};

export default NotFound;
