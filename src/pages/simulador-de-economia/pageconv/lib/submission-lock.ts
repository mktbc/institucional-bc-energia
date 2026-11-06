/** Only the attempt that acquired the lock may release it. */
export async function runExclusiveSubmission(
  lock: { current: boolean },
  submit: () => Promise<void>,
): Promise<void> {
  if (lock.current) return;
  lock.current = true;
  try {
    await submit();
  } finally {
    lock.current = false;
  }
}