import axios from "axios";
import {mapYouTubeVideos} from "../mappers";

export class YouTubeVideoService {
  constructor(videos) {
    this.videos = videos
  }

  // async getVideos() {
  //   let videos = []
  //
  //   for (const video of this.videos) {
  //     const fetchedVideo = await axios.get(
  //       `https://www.googleapis.com/youtube/v3/videos`,
  //       {
  //         params: {
  //           part: 'snippet',
  //           id: ["wG2TjtueeSU","N1-8SLr7oCE"],
  //           key: 'AIzaSyAMnp5z9bce7RgHbB8-snIKK0qENXxFRuQ',
  //         },
  //       }
  //     )
  //     videos.push(fetchedVideo)
  //   }
  //   return videos
  // }

  async video() {
    const finalArray = this.videos?.map(video => {
      return video.key
    })


    const result = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${finalArray?.toString()}`,
      {
        params: {
          part: 'snippet',
          key: 'AIzaSyAMnp5z9bce7RgHbB8-snIKK0qENXxFRuQ',
        },
      }
    )
    return mapYouTubeVideos(result)
  }
}
