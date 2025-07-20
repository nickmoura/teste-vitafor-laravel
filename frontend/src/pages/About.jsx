import React from 'react';
import '../assets/css/about.css'
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";


function About() {
  return (
    <>
      <main className="about-main container mt-5 d-flex gap-5">
        <div className="my-pic-area">
          <img src="/assets/img/cortada.jpg" className='my-pic rounded-circle' alt="" />
        </div>
        <section className="about-text d-flex flex-column justify-content-center">
          <h1 className='display-3 text-center mb-5'>Sobre mim</h1>
          <p className='fs-5'>Meu nome é Nickolas - mas pode me chamar de Nick. Sou formado em Relações Internacionais e, em transição de carreira, venho da área do Customer Service. Atualmente estudo Análise e Desenvolvimento de sistemas.</p>
          <p className='fs-5'>Sou um grande fã de rock alternativo, de cães e gatos, filmes e séries, restaurantes e tecnologia no geral.</p>
          <p className="fs-5">Sou muito comunicativo - gosto muito de conversar de conhecer pessoas novas. Acredito que cada um que conhecemos é importante para consolidar nosso conhecimento e experiência.</p>
          <p className='fs-5'>Minha stacks favoritas são: React, Node.JS, MySQL, Python e JavaScript.</p>
          <p className="fs-5">Os principais projetos que desenvolvi estão no meu portfólio, disponível <a href="https://www.nickmoura.dev" className='portfolio'>aqui</a>.</p>
        </section>
        <section className="social-area pt-5 d-flex justify-content-between align-items-center gap-4">
          <a href="https://github.com/nickmoura" target='
          _blank'>
            <svg
              className='social-icon'
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="currentColor"
              style={{ display: 'inline-block', verticalAlign: 'start' }}
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/nickmoura" target='_blank'>
            <FaLinkedin className='social-icon' target='_blank' size={80} style={{ cursor: 'pointer' }}
            />
          </a>
          <a href="mailto:nickmoura26@gmail.com" target='_blank'>
            <MdOutlineMail className='social-icon' size={80} style={{ cursor: 'pointer' }}/>
          </a>
        </section>
      </main>
    </>
  );
}

export default About;
