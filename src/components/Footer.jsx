import { PhoneIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="bg-black text-white p-10">
      <div className="flex justify-between max-w-6xl mx-auto">
        <div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <p className="flex items-center">
            <PhoneIcon className="h-5 w-5 mr-2" />
            Phone: (123) 456-7890
          </p>
          <p>Email: hello@gmail.com</p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="h-6 w-6 text-white hover:text-blue-600"
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="h-6 w-6 text-white hover:text-pink-600"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="h-6 w-6 text-white hover:text-blue-400"
              />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="/deals" className="hover:underline">
                Deals
              </a>
            </li>
            <li>
              <a href="/brands" className="hover:underline">
                Brands
              </a>
            </li>
            <li>
              <a href="/policy" className="hover:underline">
                Privacy and Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Location Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Location</h3>
          <p>1257 Shutter Street,</p>
          <p>Lensville, CA 90210,</p>
          <p>United States</p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
          <p>eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded bg-black text-white border border-gray-600 mb-2"
          />
          <button className="bg-white text-black p-2 rounded hover:bg-gray-500">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
