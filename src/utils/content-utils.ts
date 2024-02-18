export default class ContentUtils {
  public static secToMinAndSec(sec: number): string {
    const minutes = Math.floor(sec / 60)
    const seconds = sec % 60
    return `${minutes > 10 ? minutes : "0" + minutes}:${seconds < 10 ? "0" + seconds : seconds}`
  }
}
