--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-23 18:46:47

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
-- TOC entry 3345 (class 0 OID 16401)
-- Dependencies: 215
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."SequelizeMeta" (name) FROM stdin;
20230721193316-initial-migration.js
\.


--
-- TOC entry 3349 (class 0 OID 16448)
-- Dependencies: 219
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.tags (id, commentaire, id_user, "createdAt", "updatedAt") FROM stdin;
1	1RYH3L	1	2023-07-22 04:47:01.674+02	2023-07-22 04:47:01.674+02
2	0GUXUV	1	2023-07-22 04:47:10.656+02	2023-07-22 04:47:10.656+02
3	9EZQ4I	1	2023-07-22 04:47:14.779+02	2023-07-22 04:47:14.779+02
4	VTDGBP	1	2023-07-22 04:47:19.349+02	2023-07-22 04:47:19.349+02
5	4PS4IB	1	2023-07-22 04:51:11.464+02	2023-07-22 04:51:11.464+02
\.


--
-- TOC entry 3351 (class 0 OID 16460)
-- Dependencies: 221
-- Data for Name: tunnels; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.tunnels (id, commentaire, id_user, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3347 (class 0 OID 16437)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.users (id, firstname, lastname, email, password, societe, kbis, telephone, urlsite, "compteIsVerified", "appId", "createdAt", "updatedAt") FROM stdin;
1	TestAwa	Test	test@test.com	$2a$10$.hKr63usEXs/3gBzGnQN1eizv5RbZin5mM1TUkJ8kiGbAxscm8Xq6	12345	ouioui	600000000	\N	false	8ef37f72-c075-41ca-b838-8b531c685219	2023-07-21 23:34:20.961+02	2023-07-22 04:46:05.486+02
\.


--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 218
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.tags_id_seq', 5, true);


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 220
-- Name: tunnels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.tunnels_id_seq', 1, false);


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


-- Completed on 2023-07-23 18:46:48

--
-- PostgreSQL database dump complete
--

