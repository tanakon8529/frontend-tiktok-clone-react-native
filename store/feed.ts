import axios from 'axios';
import { config, getTokenInSession, checkToken, getPublicIp } from './authen';

interface Comment {
  id: number;
  username: string;
  commecnt_time: string;
  text: string;
  likes: number;
  comments?: Comment[];
}

interface FeedItem {
  length: number;
  filter: any;
  index: number;
  username: string;
  tags: string;
  music: string;
  likes: number;
  total_comments: number;
  uri: string;
  comments: Comment[];
}

type FeedData = {
    feed: FeedItem;
};

async function fetchFeed() {
    const body = {};
    try {
        const tokenInSession = await getTokenInSession();
        const token = await checkToken(tokenInSession);
        const response = await axios.post<FeedData>(`${config.apiPath}/feed/v1`, body, {
            headers: {
                'Content-Type': 'application/json',
                'token': String(token),
            },
        });
        
        return response.data;
    } catch (error: any) {
        if (error?.response) {
            console.error(error.response.data);
        } else {
            console.error(error);
        }
    }   
}

export { fetchFeed, getPublicIp, FeedData, FeedItem };