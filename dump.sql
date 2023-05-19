--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "idUser" integer NOT NULL,
    token character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "idUser" integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, 'b130d8df-0dc7-494e-b8ba-a9676481027c', '2023-05-16 22:52:02.53129');
INSERT INTO public.sessions VALUES (2, 1, 'e8b83120-7a92-401c-9420-abc35d465fae', '2023-05-16 22:52:41.987518');
INSERT INTO public.sessions VALUES (4, 1, '50b3d311-69dc-4341-87a7-23182fe4ff67', '2023-05-17 21:38:56.265819');
INSERT INTO public.sessions VALUES (6, 6, 'e92ec9c0-01c4-44c9-ba86-87562e77fd1e', '2023-05-17 22:22:38.752686');
INSERT INTO public.sessions VALUES (7, 1, '27ba0c47-82b2-4809-9050-ab3269404868', '2023-05-19 17:33:51.358282');
INSERT INTO public.sessions VALUES (8, 1, 'c0e647ac-6922-41cc-ae87-fab5030cf394', '2023-05-19 17:56:00.885218');
INSERT INTO public.sessions VALUES (9, 7, '62432649-7dc6-4fb9-b3dc-93a74432b624', '2023-05-19 17:57:15.21628');
INSERT INTO public.sessions VALUES (10, 7, 'febcc10f-d0ae-4a82-a33d-d3971d133a5d', '2023-05-19 17:58:11.083515');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (11, 1, 'u0-zrEXu', 'https://.com', 2, '2023-05-17 22:01:13.891117');
INSERT INTO public.urls VALUES (12, 1, 'QfPhMhZU', 'https://www.youtube.com/watch?v=aqTcssTfx0s', 0, '2023-05-19 17:33:58.884076');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'sisi', 'sisi@hotmail.com', '$2b$10$suDz3C9/peNo8yqwx.Im4eSVvJ32Az4yCZEurvF0s8JaYlk4P5hOu', '2023-05-16 22:20:37.708365');
INSERT INTO public.users VALUES (6, 'sica', 'sica@hotmail.com', '$2b$10$IldgIGdcF1ePwTjFsKJCs.hU6cdEJ5LjoR21Lk/gwaoJdiHjxlBUy', '2023-05-17 22:22:26.656216');
INSERT INTO public.users VALUES (7, 'ana', 'AnaClara_Reis50@hotmail.com', '$2b$10$2mT9iXEDpa7SMkAImeX00eKK7tCGsT8ew0Nwh09P2g8HFck7HOcQG', '2023-05-19 17:57:06.227847');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 10, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public.users(id);


--
-- Name: urls urls_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

