type ApiErrorPayload = {
  error?: string;
};

export async function parseApiResponse<T>(
  response: Response,
  fallbackMessage: string,
): Promise<T> {
  if (response.ok) {
    return response.json() as Promise<T>;
  }

  let message = fallbackMessage;
  try {
    const data = await response.json() as ApiErrorPayload;
    if (typeof data.error === "string" && data.error.trim()) {
      message = data.error;
    }
  } catch {
    // Keep fallback message when response body is not JSON.
  }

  throw new Error(message);
}

type ActionCallbacks = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  onSettled?: () => void;
};

type ExecuteActionParams<T> = ActionCallbacks & {
  run: () => Promise<T>;
  onResolved: (result: T) => void;
  fallbackErrorMessage: string;
};

export async function executeAction<T>({
  run,
  onResolved,
  onSuccess,
  onError,
  onSettled,
  fallbackErrorMessage,
}: ExecuteActionParams<T>): Promise<void> {
  try {
    const result = await run();
    onResolved(result);
    onSuccess?.();
  } catch (error) {
    const message = error instanceof Error ? error.message : fallbackErrorMessage;
    onError?.(message);
  } finally {
    onSettled?.();
  }
}
