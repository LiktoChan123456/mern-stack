import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Techtipsgo
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="/">Machine learning</Footer.Link>
                <Footer.Link href="/about">Techtipsgo's blog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.github.com/LiktoChan123456/mern-stack">Github</Footer.Link>
                <Footer.Link href="https://www.youtube.com/watch?v=tR-v5X-sSrQ">Youtube channel</Footer.Link>
              </Footer.LinkGroup>        
            </div>
            <div>
            <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="/">Machine learning</Footer.Link>
                <Footer.Link href="/about">Techtipsgo's blog</Footer.Link>
              </Footer.LinkGroup> 
            </div>
            <div>
            <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/">Terms &amp; Conditions</Footer.Link>
                <Footer.Link href="/about">Privacy policy</Footer.Link>
              </Footer.LinkGroup>     

            </div>

          </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm: items-center sm:justify-between'>
            <Footer.Copyright href="#" by="Techtipsgo" year={new Date().getFullYear()}  />
            <div className="flex sm:justify-center gap-3 sm:mt-0 mt-5">
                <Footer.Icon href="#" icon={BsFacebook} />
                <Footer.Icon href="#" icon={BsInstagram} />
                <Footer.Icon href="#" icon={BsTwitter} />
                <Footer.Icon href="#" icon={BsGithub} />
                <Footer.Icon href="#" icon={BsDribbble} />
    
            </div>

        </div>
      </div>
    </Footer>
  );
}
