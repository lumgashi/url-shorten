export async function isLinkExpired(ttl: bigint): Promise<boolean> {
  const currentTime = new Date(Date.now());
  const currentTimeinMiliseconds = currentTime.getTime();
  return currentTimeinMiliseconds > ttl;
}
