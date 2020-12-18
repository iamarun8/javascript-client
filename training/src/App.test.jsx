
import { render, screen, within } from "@testing-library/react";
import React from 'react';

test("pass functions to matchers", () => {
  const Hello = () => (
    <div>
      Hello <span>world</span>
    </div>
  );
  render(<Hello />);
  screen.getByText((content, node) => {
    const hasText = (node) => node.textContent === "Hello world";
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );
    return nodeHasText && childrenDontHaveText;
  });
});