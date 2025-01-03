import { API_BASE_URL, COMMENTS_PER_PAGE } from "../configs";
import { simulateDelay } from "../utils";

export const fetchComments = async (page, signal) => {
  await simulateDelay();
  const response = await fetch(
    `${API_BASE_URL}/comments?_page=${page}&_limit=${COMMENTS_PER_PAGE}`,
    { signal }
  );
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};
