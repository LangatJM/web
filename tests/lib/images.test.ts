import { phoneImageSrc } from "@/lib/images";

describe("phoneImageSrc", () => {
  it("returns the real public phone asset path for valid phone images", () => {
    expect(phoneImageSrc("/phone-images/INFINIX GT30 PRO 12+256.jpg")).toBe(
      "/phone-images/INFINIX GT30 PRO 12+256.jpg"
    );
  });

  it("falls back to the logo when the image path is missing", () => {
    expect(phoneImageSrc(null)).toBe("/logo.png");
  });
});
