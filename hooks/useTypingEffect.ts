"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypingEffectOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypingEffect({
  words,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseDuration = 2200,
}: UseTypingEffectOptions) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex % words.length];

    if (isPaused) {
      setIsPaused(false);
      setIsDeleting(true);
      return;
    }

    if (isDeleting) {
      setDisplayText((prev) => prev.slice(0, -1));
      if (displayText.length <= 1) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      setDisplayText(currentWord.slice(0, displayText.length + 1));
      if (displayText.length === currentWord.length) {
        setIsPaused(true);
      }
    }
  }, [displayText, isDeleting, isPaused, wordIndex, words]);

  useEffect(() => {
    const delay = isPaused ? pauseDuration : isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [tick, isPaused, isDeleting, typingSpeed, deletingSpeed, pauseDuration]);

  return { displayText, isTyping: !isPaused };
}
