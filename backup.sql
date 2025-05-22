--
-- PostgreSQL database dump
--

-- Dumped from database version 17rc1
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-22 23:35:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 232 (class 1259 OID 50335)
-- Name: test_attempts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_attempts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    test_type character varying(20) NOT NULL,
    status character varying(20) NOT NULL,
    total_questions integer NOT NULL,
    correct_answers integer DEFAULT 0,
    incorrect_answers integer DEFAULT 0,
    topic_id integer,
    base_questions_count integer,
    additional_questions_answered integer DEFAULT 0,
    started_at timestamp without time zone DEFAULT now(),
    completed_at timestamp without time zone,
    time_spent_seconds integer DEFAULT 0
);


ALTER TABLE public.test_attempts OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 50334)
-- Name: test_attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_attempts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.test_attempts_id_seq OWNER TO postgres;

--
-- TOC entry 4847 (class 0 OID 0)
-- Dependencies: 231
-- Name: test_attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_attempts_id_seq OWNED BY public.test_attempts.id;


--
-- TOC entry 4679 (class 2604 OID 50338)
-- Name: test_attempts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts ALTER COLUMN id SET DEFAULT nextval('public.test_attempts_id_seq'::regclass);


--
-- TOC entry 4841 (class 0 OID 50335)
-- Dependencies: 232
-- Data for Name: test_attempts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_attempts (id, user_id, test_type, status, total_questions, correct_answers, incorrect_answers, topic_id, base_questions_count, additional_questions_answered, started_at, completed_at, time_spent_seconds) FROM stdin;
1	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 16:43:45.002	\N	0
2	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 16:43:45.028	\N	0
74	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:32:03.043	\N	0
64	2	exam	failed	20	8	12	\N	20	0	2025-05-14 19:10:33.44	2025-05-14 19:10:57.242	23
65	30	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:08:22.089	\N	0
66	30	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:08:22.202	\N	0
39	2	exam	passed	30	18	2	\N	20	10	2025-05-13 21:52:37.24	2025-05-13 21:55:13.802	156
40	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:58:38.746	\N	0
41	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:58:38.759	\N	0
42	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:58:38.772	\N	0
43	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 00:18:23.622	\N	0
44	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 00:18:32.276	\N	0
45	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 00:18:34.871	\N	0
18	2	exam	failed	20	7	13	\N	20	0	2025-05-13 19:38:44.212	2025-05-13 19:39:16.96	32
19	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 19:40:05.264	\N	0
20	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 19:40:05.349	\N	0
46	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 00:18:36.461	\N	0
47	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 00:37:45.283	\N	0
48	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 00:38:23.61	\N	0
49	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 00:45:05.81	\N	0
50	2	topic	in_progress	20	0	0	2	20	0	2025-05-14 00:45:12.113	\N	0
3	2	exam	failed	20	7	13	\N	20	0	2025-05-13 16:43:45.14	2025-05-13 16:44:05.627	20
4	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 16:44:13.16	\N	0
5	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 16:44:13.173	\N	0
6	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 16:44:13.217	\N	0
7	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 17:15:26.532	\N	0
8	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 17:15:26.698	\N	0
51	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 00:45:16.074	\N	0
36	2	exam	passed	30	18	2	\N	20	10	2025-05-13 21:43:07.782	2025-05-13 21:46:13.171	185
37	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:52:37.166	\N	0
38	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:52:37.224	\N	0
9	2	exam	in_progress	20	3	2	\N	20	0	2025-05-13 17:15:26.724	\N	7
10	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 17:19:56.397	\N	0
11	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 17:19:56.463	\N	0
12	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 17:19:56.5	\N	0
13	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 19:36:11.302	\N	0
14	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 19:36:11.34	\N	0
52	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 00:45:38.554	\N	0
53	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 01:05:16.517	\N	0
54	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 01:05:28.372	\N	0
55	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 01:14:46.8	\N	0
56	2	topic	in_progress	20	0	0	2	20	0	2025-05-14 01:15:37.108	\N	0
57	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 01:43:33.653	\N	0
58	2	topic	in_progress	20	0	0	2	20	0	2025-05-14 01:44:19.66	\N	0
59	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 01:45:03.73	\N	0
60	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 01:50:50.283	\N	0
61	2	topic	in_progress	8	0	0	1	8	0	2025-05-14 01:54:48.057	\N	0
21	2	exam	passed	20	18	2	\N	20	0	2025-05-13 19:40:05.446	2025-05-13 19:43:55.71	230
22	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:38:22.551	\N	0
23	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:38:22.7	\N	0
24	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:38:22.732	\N	0
25	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:38:26.042	\N	0
26	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:38:26.099	\N	0
27	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:38:26.143	\N	0
28	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:39:20.81	\N	0
29	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:39:20.915	\N	0
15	2	exam	failed	20	6	14	\N	20	0	2025-05-13 19:36:11.452	2025-05-13 19:36:34.888	23
16	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 19:38:44.137	\N	0
17	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 19:38:44.196	\N	0
30	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:39:20.94	\N	0
31	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:42:58.584	\N	0
32	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:42:58.788	\N	0
33	2	exam	in_progress	20	1	0	\N	20	0	2025-05-13 21:42:58.956	\N	4
34	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:43:07.513	\N	0
35	2	exam	in_progress	20	0	0	\N	20	0	2025-05-13 21:43:07.554	\N	0
62	2	exam	in_progress	20	0	0	\N	20	0	2025-05-14 19:10:33.327	\N	0
63	2	exam	in_progress	20	0	0	\N	20	0	2025-05-14 19:10:33.384	\N	0
67	30	exam	in_progress	20	3	7	\N	20	0	2025-05-22 17:08:22.277	\N	11
68	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:22:48.757	\N	0
69	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:22:48.933	\N	0
70	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:22:48.972	\N	0
75	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:32:03.162	\N	0
71	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:22:53.705	\N	0
72	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:22:53.723	\N	0
73	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:22:53.768	\N	0
76	1	exam	failed	20	4	16	\N	20	0	2025-05-22 17:32:03.223	2025-05-22 17:32:20.721	17
77	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:36:52.274	\N	0
78	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:36:52.302	\N	0
79	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:36:52.453	\N	0
80	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:36:55.396	\N	0
81	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:36:55.409	\N	0
82	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:36:55.485	\N	0
83	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:37:54.325	\N	0
84	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:39:34.9	\N	0
85	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:39:35.016	\N	0
109	1	topic	failed	8	3	5	1	8	0	2025-05-22 20:15:57.823	2025-05-22 20:16:24.799	0
110	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 20:17:29.209	\N	0
111	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 20:17:29.341	\N	0
112	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 20:17:29.375	\N	0
113	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 20:21:44.039	\N	0
114	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 20:21:44.056	\N	0
115	1	exam	in_progress	20	1	0	\N	20	0	2025-05-22 20:21:44.186	\N	6
116	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:22:00.499	\N	0
117	1	topic	failed	20	10	10	2	20	0	2025-05-22 20:22:10.6	2025-05-22 20:22:56.469	0
118	1	topic	failed	8	3	5	1	8	0	2025-05-22 20:25:45.509	2025-05-22 20:26:05.029	0
119	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:33:59.55	\N	0
120	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:35:28.02	\N	0
121	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:36:21.056	\N	0
122	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:36:51.528	\N	0
123	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:36:58.588	\N	0
124	1	topic	passed	8	6	2	1	8	0	2025-05-22 20:41:59.889	2025-05-22 20:42:25.319	0
86	1	exam	failed	20	7	13	\N	20	0	2025-05-22 17:39:35.065	2025-05-22 17:40:11.886	36
87	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:40:29.085	\N	0
88	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:40:29.182	\N	0
89	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:40:29.216	\N	0
90	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:40:40.574	\N	0
91	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:40:40.691	\N	0
92	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:40:40.759	\N	0
93	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:41:57.337	\N	0
94	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:42:51.547	\N	0
95	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:42:54.713	\N	0
96	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:42:54.866	\N	0
97	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:42:54.987	\N	0
98	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:43:04.635	\N	0
99	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 17:43:04.682	\N	0
125	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:42:28.581	\N	0
126	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:47:55.428	\N	0
100	1	exam	in_progress	20	0	3	\N	20	0	2025-05-22 17:43:04.891	\N	3
101	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 17:44:32.275	\N	0
102	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 19:53:03.156	\N	0
103	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 19:53:03.261	\N	0
104	1	exam	in_progress	20	0	1	\N	20	0	2025-05-22 19:53:03.357	\N	1
105	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 20:08:26.678	\N	0
106	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 20:08:26.839	\N	0
127	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:54:16.814	\N	0
128	1	topic	in_progress	20	0	0	2	20	0	2025-05-22 20:54:40.449	\N	0
129	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 21:03:06.141	\N	0
130	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 21:03:06.166	\N	0
131	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 21:05:07.745	\N	0
132	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 21:11:17.214	\N	0
133	1	exam	in_progress	20	1	1	\N	20	0	2025-05-22 21:11:17.343	\N	3
134	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 21:11:23.521	\N	0
135	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 21:11:36.469	\N	0
136	1	exam	in_progress	20	0	0	\N	20	0	2025-05-22 21:11:36.569	\N	0
137	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 21:12:03.114	\N	0
138	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 21:14:53.371	\N	0
139	1	topic	failed	8	4	4	1	8	0	2025-05-22 22:11:22.645	2025-05-22 22:11:38.639	0
140	1	topic	failed	8	2	6	1	8	0	2025-05-22 22:12:49.009	2025-05-22 22:13:01.001	0
141	1	topic	failed	8	4	4	1	8	0	2025-05-22 22:15:27.045	2025-05-22 22:15:37.416	0
107	1	exam	failed	20	8	12	\N	20	0	2025-05-22 20:08:26.867	2025-05-22 20:08:44.583	17
108	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 20:12:09.595	\N	0
142	1	topic	failed	8	2	6	1	8	0	2025-05-22 22:19:27.552	2025-05-22 22:19:37.268	0
143	1	topic	failed	8	2	6	1	8	0	2025-05-22 22:20:10.174	2025-05-22 22:20:22.506	0
144	1	topic	failed	8	5	3	1	8	0	2025-05-22 22:25:21.702	2025-05-22 22:25:37.321	15
145	1	topic	failed	8	4	4	1	8	0	2025-05-22 22:25:51.164	2025-05-22 22:25:59.395	8
146	1	topic	failed	8	2	6	1	8	0	2025-05-22 22:27:16.652	2025-05-22 22:27:24.641	7
147	1	topic	failed	8	5	3	1	8	0	2025-05-22 22:29:39.662	2025-05-22 22:29:47.409	7
148	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 22:29:53.209	\N	0
149	1	topic	in_progress	20	0	0	2	20	0	2025-05-22 22:29:56.799	\N	0
150	1	topic	in_progress	20	0	0	2	20	0	2025-05-22 22:29:59.458	\N	0
151	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 22:30:03.279	\N	0
152	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 22:32:47.215	\N	0
153	1	topic	in_progress	20	0	0	2	20	0	2025-05-22 22:32:50.507	\N	0
154	1	topic	in_progress	10	0	0	3	10	0	2025-05-22 22:32:55.346	\N	0
155	1	topic	in_progress	20	0	0	5	20	0	2025-05-22 22:32:59.188	\N	0
156	1	topic	failed	20	6	14	2	20	0	2025-05-22 22:33:44.664	2025-05-22 22:34:06.84	22
157	1	topic	failed	8	1	7	1	8	0	2025-05-22 22:38:51.628	2025-05-22 22:39:00.533	8
158	1	topic	failed	28	5	23	5	28	0	2025-05-22 22:39:06.861	2025-05-22 22:39:36.096	29
159	1	topic	in_progress	14	0	0	12	14	0	2025-05-22 22:46:17.564	\N	0
160	1	topic	in_progress	8	0	0	1	8	0	2025-05-22 22:50:22.222	\N	0
161	40	exam	failed	20	2	18	\N	20	0	2025-05-22 23:30:19.801	2025-05-22 23:30:39.171	19
162	40	topic	failed	10	2	8	3	10	0	2025-05-22 23:30:55.55	2025-05-22 23:31:04.262	8
\.


--
-- TOC entry 4848 (class 0 OID 0)
-- Dependencies: 231
-- Name: test_attempts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_attempts_id_seq', 162, true);


--
-- TOC entry 4692 (class 2606 OID 50344)
-- Name: test_attempts test_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT test_attempts_pkey PRIMARY KEY (id);


--
-- TOC entry 4685 (class 1259 OID 50358)
-- Name: idx_test_attempts_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_attempts_status ON public.test_attempts USING btree (status);


--
-- TOC entry 4686 (class 1259 OID 50357)
-- Name: idx_test_attempts_test_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_attempts_test_type ON public.test_attempts USING btree (test_type);


--
-- TOC entry 4687 (class 1259 OID 50359)
-- Name: idx_test_attempts_topic_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_attempts_topic_id ON public.test_attempts USING btree (topic_id);


--
-- TOC entry 4688 (class 1259 OID 50360)
-- Name: idx_test_attempts_user_completed; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_attempts_user_completed ON public.test_attempts USING btree (user_id, completed_at);


--
-- TOC entry 4689 (class 1259 OID 50356)
-- Name: idx_test_attempts_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_attempts_user_id ON public.test_attempts USING btree (user_id);


--
-- TOC entry 4690 (class 1259 OID 50361)
-- Name: idx_test_attempts_user_topic; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_test_attempts_user_topic ON public.test_attempts USING btree (user_id, topic_id) WHERE (topic_id IS NOT NULL);


--
-- TOC entry 4693 (class 2606 OID 50350)
-- Name: test_attempts test_attempts_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT test_attempts_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id);


--
-- TOC entry 4694 (class 2606 OID 50345)
-- Name: test_attempts test_attempts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_attempts
    ADD CONSTRAINT test_attempts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2025-05-22 23:35:26

--
-- PostgreSQL database dump complete
--

