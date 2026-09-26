export function AIResponseParser({
  content,
}: {
  content: string;
  textColor?: string;
  className?: string;
}) {
  return <div data-testid="ai-response-parser">{content}</div>;
}
