"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";

export default function NotFound() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "404: Directory not found." },
    { type: "system", text: "You have wandered off the edge of the map." },
    { type: "system", text: "Type 'cd /home' or 'exit' to return to safety." },
  ]);
  const inputRef = useRef(null);
  const router = useRouter();

  // Keep focus on hidden input
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) inputRef.current.focus();
    };
    focusInput();
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      
      const newHistory = [...history, { type: "input", text: `guest@notubaid:~$ ${input}` }];
      
      if (cmd === "cd /home" || cmd === "cd /" || cmd === "exit" || cmd === "cd ..") {
        newHistory.push({ type: "system", text: "Redirecting..." });
        setHistory(newHistory);
        setTimeout(() => {
          router.push("/");
        }, 800);
      } else if (cmd === "ls") {
        newHistory.push({ type: "system", text: "There is nothing here. Just the void." });
        setHistory(newHistory);
        setInput("");
      } else if (cmd === "sudo") {
        newHistory.push({ type: "system", text: "Nice try. You are not in the sudoers file. This incident will be reported." });
        setHistory(newHistory);
        setInput("");
      } else if (cmd !== "") {
        newHistory.push({ type: "system", text: `bash: ${cmd}: command not found` });
        setHistory(newHistory);
        setInput("");
      } else {
        setHistory(newHistory);
        setInput("");
      }
    }
  };

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalOutput}>
        {history.map((line, i) => (
          <p key={i} className={`${styles.line} ${line.type === "system" ? styles.systemMsg : ""}`}>
            {line.text}
          </p>
        ))}
      </div>
      <div className={styles.inputLine}>
        <span className={styles.prompt}>guest@notubaid:~$</span>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            className={styles.hiddenInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
          <span className={styles.visibleInput}>{input}</span>
          <span className={styles.cursor}></span>
        </div>
      </div>
    </div>
  );
}
