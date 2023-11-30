--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

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

--
-- Name: cafeducoin; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA cafeducoin;


ALTER SCHEMA cafeducoin OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: history; Type: TABLE; Schema: cafeducoin; Owner: postgres
--

CREATE TABLE cafeducoin.history (
    id integer NOT NULL,
    id_game integer NOT NULL,
    id_user integer NOT NULL,
    borrow_date date NOT NULL,
    return_date date
);


ALTER TABLE cafeducoin.history OWNER TO postgres;

--
-- Name: Historical_id_seq; Type: SEQUENCE; Schema: cafeducoin; Owner: postgres
--

CREATE SEQUENCE cafeducoin."Historical_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE cafeducoin."Historical_id_seq" OWNER TO postgres;

--
-- Name: Historical_id_seq; Type: SEQUENCE OWNED BY; Schema: cafeducoin; Owner: postgres
--

ALTER SEQUENCE cafeducoin."Historical_id_seq" OWNED BY cafeducoin.history.id;


--
-- Name: games; Type: TABLE; Schema: cafeducoin; Owner: postgres
--

CREATE TABLE cafeducoin.games (
    id integer NOT NULL,
    title text NOT NULL,
    returned boolean
);


ALTER TABLE cafeducoin.games OWNER TO postgres;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: cafeducoin; Owner: postgres
--

CREATE SEQUENCE cafeducoin.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE cafeducoin.games_id_seq OWNER TO postgres;

--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: cafeducoin; Owner: postgres
--

ALTER SEQUENCE cafeducoin.games_id_seq OWNED BY cafeducoin.games.id;


--
-- Name: users; Type: TABLE; Schema: cafeducoin; Owner: postgres
--

CREATE TABLE cafeducoin.users (
    id integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    pwd text NOT NULL,
    username text NOT NULL
);


ALTER TABLE cafeducoin.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: cafeducoin; Owner: postgres
--

CREATE SEQUENCE cafeducoin.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE cafeducoin.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: cafeducoin; Owner: postgres
--

ALTER SEQUENCE cafeducoin.users_id_seq OWNED BY cafeducoin.users.id;


--
-- Name: games id; Type: DEFAULT; Schema: cafeducoin; Owner: postgres
--

ALTER TABLE ONLY cafeducoin.games ALTER COLUMN id SET DEFAULT nextval('cafeducoin.games_id_seq'::regclass);


--
-- Name: history id; Type: DEFAULT; Schema: cafeducoin; Owner: postgres
--

ALTER TABLE ONLY cafeducoin.history ALTER COLUMN id SET DEFAULT nextval('cafeducoin."Historical_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: cafeducoin; Owner: postgres
--

ALTER TABLE ONLY cafeducoin.users ALTER COLUMN id SET DEFAULT nextval('cafeducoin.users_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: cafeducoin; Owner: postgres
--

COPY cafeducoin.games (id, title, returned) FROM stdin;
134	7 Wonders : Architects	t
109	La maison des souris	t
100	La soupe des ├®cureuils	t
101	Doudou	t
102	Mon premier verger	t
103	Farmini	t
104	Little Battle	t
105	Attrape r├¬ves	t
106	Mr. Wolf	t
107	Dragomino	t
108	Fabulia	t
110	Le Roi Sommeil	t
111	Roulapik	t
112	Oh my gold!	t
113	Les aventuriers du rail Europe : Premier voyage	t
114	Zombie Kidz Evolution	t
115	Kariba	t
116	Bandido	t
117	Patatrap Quest	t
118	Unlock ! Kids : Une histoire de d├®tectives	t
119	Karak	t
120	Catan Junior	t
121	Chabyrinthe	t
122	Draftosaurus	t
123	Kluster	t
124	Codenames	t
125	Similo : Contes	t
126	Mot Malin	t
127	Cartaventura : Vinland	t
128	Saboteur 2	t
129	Les aventuriers du rail Europe	t
130	7 Wonders - Nouvelle ├®dition	t
131	Pandemic	t
132	Hit !	t
133	Takenoko	t
135	Pandemic Zone Rouge : Europe	t
136	Celestia	t
190	Evolution	t
191	Terraforming Mars	t
192	Clank !	t
193	Dune Imperium	t
194	Les ruines perdues de Narak	t
99	Mon Premier Carcassonne	t
170	50 Missions	t
184	7 Wonders Duel	t
137	Timebomb	t
138	Welcome To The Moon	t
139	Lost Seas	t
140	LÔÇÖ├Äle Interdite	t
141	K3 : Plan your climb	t
142	Happy City	t
143	Azul	t
144	Res Arcana	t
145	Nidavellir	t
146	Oriflamme	t
147	Honey Buzz	t
148	Living Forest	t
149	Get On Board : London & New York	t
150	Les Petites Bourgades	t
151	Undo : La fi├¿vre du tr├®sor	t
152	Exit : La cabane abandonn├®e	t
153	T.I.M.E Stories	t
154	Mysterium Park	t
155	Escape 2222	t
156	Sherlock Holmes D├®tective Conseil : Meurtres de la Tamise et autres enqu├¬tes	t
157	Suspects	t
158	Unlock ! Timeless Adventures	t
159	Detective	t
160	Mafia de Cuba	t
161	Les loups-garous de Thiercelieux	t
162	TTMC : Tu Te Mets Combien ?	t
163	Taco, Chat, Bouc, Cheese, Pizza	t
164	Citadelles (4e ├ëdition) - Nouveau Format	t
165	Top Ten	t
166	Welcome	t
167	Gal├¿rapagos	t
168	Spicy	t
169	Trapwords	t
171	Mysterium	t
172	The Crew : Mission Sous-Marine	t
173	Hanabi	t
174	Kosmopoli:t	t
175	Magic Maze	t
176	Unlock ! Game Adventures	t
177	Last Message	t
178	Oltr├®├®	t
179	The Mind	t
180	Schotten totten	t
181	Nagaraja	t
182	Tribunal 1920	t
183	Sobek - 2 joueurs	t
185	Aqualin	t
186	Mr. Jack London	t
187	Kingdomino Duel	t
188	Nicodemus	t
189	Moon Base	t
\.


--
-- Data for Name: history; Type: TABLE DATA; Schema: cafeducoin; Owner: postgres
--

COPY cafeducoin.history (id, id_game, id_user, borrow_date, return_date) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: cafeducoin; Owner: postgres
--

COPY cafeducoin.users (id, firstname, lastname, email, pwd, username) FROM stdin;
3	John	Smith	johnsmith@email.com	89e01536ac207279409d4de1e5253e01f4a1769e696db0d6062ca9b8f56767c8	john smith
\.


--
-- Name: Historical_id_seq; Type: SEQUENCE SET; Schema: cafeducoin; Owner: postgres
--

SELECT pg_catalog.setval('cafeducoin."Historical_id_seq"', 99, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: cafeducoin; Owner: postgres
--

SELECT pg_catalog.setval('cafeducoin.games_id_seq', 194, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: cafeducoin; Owner: postgres
--

SELECT pg_catalog.setval('cafeducoin.users_id_seq', 3, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: cafeducoin; Owner: postgres
--

ALTER TABLE ONLY cafeducoin.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: history history_pkey; Type: CONSTRAINT; Schema: cafeducoin; Owner: postgres
--

ALTER TABLE ONLY cafeducoin.history
    ADD CONSTRAINT history_pkey PRIMARY KEY (id);


--
-- Name: games title; Type: CONSTRAINT; Schema: cafeducoin; Owner: postgres
--

ALTER TABLE ONLY cafeducoin.games
    ADD CONSTRAINT title UNIQUE (title);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: cafeducoin; Owner: postgres
--

ALTER TABLE ONLY cafeducoin.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

