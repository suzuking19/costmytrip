create table "public"."categories" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null
);


create table "public"."cities" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "country" text
);


create table "public"."daily_records" (
    "id" uuid not null default uuid_generate_v4(),
    "expense_card_id" uuid not null,
    "date" date not null,
    "description" text
);


create table "public"."expense_card_statuses" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null
);


create table "public"."expense_cards" (
    "id" uuid not null default uuid_generate_v4(),
    "user_id" uuid not null,
    "title" text not null,
    "description" text,
    "city_id" uuid,
    "start_date" date not null,
    "end_date" date not null,
    "travel_type_id" uuid,
    "number_of_travelers" integer not null default 1,
    "position_id" uuid,
    "status_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."expense_items" (
    "id" uuid not null default uuid_generate_v4(),
    "daily_record_id" uuid not null,
    "category_id" uuid not null,
    "amount_usd" numeric(10,2) not null,
    "description" text,
    "maps_links" text[],
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."positions" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null
);


create table "public"."travel_types" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null
);


create table "public"."user_bookmarked_expense_cards" (
    "user_id" uuid not null,
    "expense_card_id" uuid not null
);


create table "public"."user_pinned_cities" (
    "user_id" uuid not null,
    "city_id" uuid not null
);


create table "public"."user_profiles" (
    "id" uuid not null,
    "username" text not null,
    "description" text,
    "current_city_id" uuid,
    "spoken_languages" text[],
    "instagram_url" text,
    "x_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


CREATE UNIQUE INDEX categories_name_key ON public.categories USING btree (name);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX cities_pkey ON public.cities USING btree (id);

CREATE UNIQUE INDEX daily_records_expense_card_id_date_key ON public.daily_records USING btree (expense_card_id, date);

CREATE UNIQUE INDEX daily_records_pkey ON public.daily_records USING btree (id);

CREATE UNIQUE INDEX expense_card_statuses_name_key ON public.expense_card_statuses USING btree (name);

CREATE UNIQUE INDEX expense_card_statuses_pkey ON public.expense_card_statuses USING btree (id);

CREATE UNIQUE INDEX expense_cards_pkey ON public.expense_cards USING btree (id);

CREATE UNIQUE INDEX expense_items_pkey ON public.expense_items USING btree (id);

CREATE UNIQUE INDEX positions_name_key ON public.positions USING btree (name);

CREATE UNIQUE INDEX positions_pkey ON public.positions USING btree (id);

CREATE UNIQUE INDEX travel_types_name_key ON public.travel_types USING btree (name);

CREATE UNIQUE INDEX travel_types_pkey ON public.travel_types USING btree (id);

CREATE UNIQUE INDEX user_bookmarked_expense_cards_pkey ON public.user_bookmarked_expense_cards USING btree (user_id, expense_card_id);

CREATE UNIQUE INDEX user_pinned_cities_pkey ON public.user_pinned_cities USING btree (user_id, city_id);

CREATE UNIQUE INDEX user_profiles_pkey ON public.user_profiles USING btree (id);

CREATE UNIQUE INDEX user_profiles_username_key ON public.user_profiles USING btree (username);

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."cities" add constraint "cities_pkey" PRIMARY KEY using index "cities_pkey";

alter table "public"."daily_records" add constraint "daily_records_pkey" PRIMARY KEY using index "daily_records_pkey";

alter table "public"."expense_card_statuses" add constraint "expense_card_statuses_pkey" PRIMARY KEY using index "expense_card_statuses_pkey";

alter table "public"."expense_cards" add constraint "expense_cards_pkey" PRIMARY KEY using index "expense_cards_pkey";

alter table "public"."expense_items" add constraint "expense_items_pkey" PRIMARY KEY using index "expense_items_pkey";

alter table "public"."positions" add constraint "positions_pkey" PRIMARY KEY using index "positions_pkey";

alter table "public"."travel_types" add constraint "travel_types_pkey" PRIMARY KEY using index "travel_types_pkey";

alter table "public"."user_bookmarked_expense_cards" add constraint "user_bookmarked_expense_cards_pkey" PRIMARY KEY using index "user_bookmarked_expense_cards_pkey";

alter table "public"."user_pinned_cities" add constraint "user_pinned_cities_pkey" PRIMARY KEY using index "user_pinned_cities_pkey";

alter table "public"."user_profiles" add constraint "user_profiles_pkey" PRIMARY KEY using index "user_profiles_pkey";

alter table "public"."categories" add constraint "categories_name_key" UNIQUE using index "categories_name_key";

alter table "public"."daily_records" add constraint "daily_records_expense_card_id_date_key" UNIQUE using index "daily_records_expense_card_id_date_key";

alter table "public"."daily_records" add constraint "daily_records_expense_card_id_fkey" FOREIGN KEY (expense_card_id) REFERENCES expense_cards(id) ON DELETE CASCADE not valid;

alter table "public"."daily_records" validate constraint "daily_records_expense_card_id_fkey";

alter table "public"."expense_card_statuses" add constraint "expense_card_statuses_name_key" UNIQUE using index "expense_card_statuses_name_key";

alter table "public"."expense_cards" add constraint "expense_cards_city_id_fkey" FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE RESTRICT not valid;

alter table "public"."expense_cards" validate constraint "expense_cards_city_id_fkey";

alter table "public"."expense_cards" add constraint "expense_cards_position_id_fkey" FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE RESTRICT not valid;

alter table "public"."expense_cards" validate constraint "expense_cards_position_id_fkey";

alter table "public"."expense_cards" add constraint "expense_cards_status_id_fkey" FOREIGN KEY (status_id) REFERENCES expense_card_statuses(id) ON DELETE RESTRICT not valid;

alter table "public"."expense_cards" validate constraint "expense_cards_status_id_fkey";

alter table "public"."expense_cards" add constraint "expense_cards_travel_type_id_fkey" FOREIGN KEY (travel_type_id) REFERENCES travel_types(id) ON DELETE RESTRICT not valid;

alter table "public"."expense_cards" validate constraint "expense_cards_travel_type_id_fkey";

alter table "public"."expense_cards" add constraint "expense_cards_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE not valid;

alter table "public"."expense_cards" validate constraint "expense_cards_user_id_fkey";

alter table "public"."expense_items" add constraint "expense_items_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT not valid;

alter table "public"."expense_items" validate constraint "expense_items_category_id_fkey";

alter table "public"."expense_items" add constraint "expense_items_daily_record_id_fkey" FOREIGN KEY (daily_record_id) REFERENCES daily_records(id) ON DELETE CASCADE not valid;

alter table "public"."expense_items" validate constraint "expense_items_daily_record_id_fkey";

alter table "public"."positions" add constraint "positions_name_key" UNIQUE using index "positions_name_key";

alter table "public"."travel_types" add constraint "travel_types_name_key" UNIQUE using index "travel_types_name_key";

alter table "public"."user_bookmarked_expense_cards" add constraint "user_bookmarked_expense_cards_expense_card_id_fkey" FOREIGN KEY (expense_card_id) REFERENCES expense_cards(id) ON DELETE CASCADE not valid;

alter table "public"."user_bookmarked_expense_cards" validate constraint "user_bookmarked_expense_cards_expense_card_id_fkey";

alter table "public"."user_bookmarked_expense_cards" add constraint "user_bookmarked_expense_cards_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE not valid;

alter table "public"."user_bookmarked_expense_cards" validate constraint "user_bookmarked_expense_cards_user_id_fkey";

alter table "public"."user_profiles" add constraint "user_profiles_current_city_id_fkey" FOREIGN KEY (current_city_id) REFERENCES cities(id) not valid;

alter table "public"."user_profiles" validate constraint "user_profiles_current_city_id_fkey";

alter table "public"."user_profiles" add constraint "user_profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_profiles" validate constraint "user_profiles_id_fkey";

alter table "public"."user_profiles" add constraint "user_profiles_username_key" UNIQUE using index "user_profiles_username_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.user_profiles (id, username)
  VALUES (NEW.id, NEW.email); -- 認証時のメールアドレスを初期のusernameとして設定 (後にユーザーが変更可能)
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."cities" to "anon";

grant insert on table "public"."cities" to "anon";

grant references on table "public"."cities" to "anon";

grant select on table "public"."cities" to "anon";

grant trigger on table "public"."cities" to "anon";

grant truncate on table "public"."cities" to "anon";

grant update on table "public"."cities" to "anon";

grant delete on table "public"."cities" to "authenticated";

grant insert on table "public"."cities" to "authenticated";

grant references on table "public"."cities" to "authenticated";

grant select on table "public"."cities" to "authenticated";

grant trigger on table "public"."cities" to "authenticated";

grant truncate on table "public"."cities" to "authenticated";

grant update on table "public"."cities" to "authenticated";

grant delete on table "public"."cities" to "service_role";

grant insert on table "public"."cities" to "service_role";

grant references on table "public"."cities" to "service_role";

grant select on table "public"."cities" to "service_role";

grant trigger on table "public"."cities" to "service_role";

grant truncate on table "public"."cities" to "service_role";

grant update on table "public"."cities" to "service_role";

grant delete on table "public"."daily_records" to "anon";

grant insert on table "public"."daily_records" to "anon";

grant references on table "public"."daily_records" to "anon";

grant select on table "public"."daily_records" to "anon";

grant trigger on table "public"."daily_records" to "anon";

grant truncate on table "public"."daily_records" to "anon";

grant update on table "public"."daily_records" to "anon";

grant delete on table "public"."daily_records" to "authenticated";

grant insert on table "public"."daily_records" to "authenticated";

grant references on table "public"."daily_records" to "authenticated";

grant select on table "public"."daily_records" to "authenticated";

grant trigger on table "public"."daily_records" to "authenticated";

grant truncate on table "public"."daily_records" to "authenticated";

grant update on table "public"."daily_records" to "authenticated";

grant delete on table "public"."daily_records" to "service_role";

grant insert on table "public"."daily_records" to "service_role";

grant references on table "public"."daily_records" to "service_role";

grant select on table "public"."daily_records" to "service_role";

grant trigger on table "public"."daily_records" to "service_role";

grant truncate on table "public"."daily_records" to "service_role";

grant update on table "public"."daily_records" to "service_role";

grant delete on table "public"."expense_card_statuses" to "anon";

grant insert on table "public"."expense_card_statuses" to "anon";

grant references on table "public"."expense_card_statuses" to "anon";

grant select on table "public"."expense_card_statuses" to "anon";

grant trigger on table "public"."expense_card_statuses" to "anon";

grant truncate on table "public"."expense_card_statuses" to "anon";

grant update on table "public"."expense_card_statuses" to "anon";

grant delete on table "public"."expense_card_statuses" to "authenticated";

grant insert on table "public"."expense_card_statuses" to "authenticated";

grant references on table "public"."expense_card_statuses" to "authenticated";

grant select on table "public"."expense_card_statuses" to "authenticated";

grant trigger on table "public"."expense_card_statuses" to "authenticated";

grant truncate on table "public"."expense_card_statuses" to "authenticated";

grant update on table "public"."expense_card_statuses" to "authenticated";

grant delete on table "public"."expense_card_statuses" to "service_role";

grant insert on table "public"."expense_card_statuses" to "service_role";

grant references on table "public"."expense_card_statuses" to "service_role";

grant select on table "public"."expense_card_statuses" to "service_role";

grant trigger on table "public"."expense_card_statuses" to "service_role";

grant truncate on table "public"."expense_card_statuses" to "service_role";

grant update on table "public"."expense_card_statuses" to "service_role";

grant delete on table "public"."expense_cards" to "anon";

grant insert on table "public"."expense_cards" to "anon";

grant references on table "public"."expense_cards" to "anon";

grant select on table "public"."expense_cards" to "anon";

grant trigger on table "public"."expense_cards" to "anon";

grant truncate on table "public"."expense_cards" to "anon";

grant update on table "public"."expense_cards" to "anon";

grant delete on table "public"."expense_cards" to "authenticated";

grant insert on table "public"."expense_cards" to "authenticated";

grant references on table "public"."expense_cards" to "authenticated";

grant select on table "public"."expense_cards" to "authenticated";

grant trigger on table "public"."expense_cards" to "authenticated";

grant truncate on table "public"."expense_cards" to "authenticated";

grant update on table "public"."expense_cards" to "authenticated";

grant delete on table "public"."expense_cards" to "service_role";

grant insert on table "public"."expense_cards" to "service_role";

grant references on table "public"."expense_cards" to "service_role";

grant select on table "public"."expense_cards" to "service_role";

grant trigger on table "public"."expense_cards" to "service_role";

grant truncate on table "public"."expense_cards" to "service_role";

grant update on table "public"."expense_cards" to "service_role";

grant delete on table "public"."expense_items" to "anon";

grant insert on table "public"."expense_items" to "anon";

grant references on table "public"."expense_items" to "anon";

grant select on table "public"."expense_items" to "anon";

grant trigger on table "public"."expense_items" to "anon";

grant truncate on table "public"."expense_items" to "anon";

grant update on table "public"."expense_items" to "anon";

grant delete on table "public"."expense_items" to "authenticated";

grant insert on table "public"."expense_items" to "authenticated";

grant references on table "public"."expense_items" to "authenticated";

grant select on table "public"."expense_items" to "authenticated";

grant trigger on table "public"."expense_items" to "authenticated";

grant truncate on table "public"."expense_items" to "authenticated";

grant update on table "public"."expense_items" to "authenticated";

grant delete on table "public"."expense_items" to "service_role";

grant insert on table "public"."expense_items" to "service_role";

grant references on table "public"."expense_items" to "service_role";

grant select on table "public"."expense_items" to "service_role";

grant trigger on table "public"."expense_items" to "service_role";

grant truncate on table "public"."expense_items" to "service_role";

grant update on table "public"."expense_items" to "service_role";

grant delete on table "public"."positions" to "anon";

grant insert on table "public"."positions" to "anon";

grant references on table "public"."positions" to "anon";

grant select on table "public"."positions" to "anon";

grant trigger on table "public"."positions" to "anon";

grant truncate on table "public"."positions" to "anon";

grant update on table "public"."positions" to "anon";

grant delete on table "public"."positions" to "authenticated";

grant insert on table "public"."positions" to "authenticated";

grant references on table "public"."positions" to "authenticated";

grant select on table "public"."positions" to "authenticated";

grant trigger on table "public"."positions" to "authenticated";

grant truncate on table "public"."positions" to "authenticated";

grant update on table "public"."positions" to "authenticated";

grant delete on table "public"."positions" to "service_role";

grant insert on table "public"."positions" to "service_role";

grant references on table "public"."positions" to "service_role";

grant select on table "public"."positions" to "service_role";

grant trigger on table "public"."positions" to "service_role";

grant truncate on table "public"."positions" to "service_role";

grant update on table "public"."positions" to "service_role";

grant delete on table "public"."travel_types" to "anon";

grant insert on table "public"."travel_types" to "anon";

grant references on table "public"."travel_types" to "anon";

grant select on table "public"."travel_types" to "anon";

grant trigger on table "public"."travel_types" to "anon";

grant truncate on table "public"."travel_types" to "anon";

grant update on table "public"."travel_types" to "anon";

grant delete on table "public"."travel_types" to "authenticated";

grant insert on table "public"."travel_types" to "authenticated";

grant references on table "public"."travel_types" to "authenticated";

grant select on table "public"."travel_types" to "authenticated";

grant trigger on table "public"."travel_types" to "authenticated";

grant truncate on table "public"."travel_types" to "authenticated";

grant update on table "public"."travel_types" to "authenticated";

grant delete on table "public"."travel_types" to "service_role";

grant insert on table "public"."travel_types" to "service_role";

grant references on table "public"."travel_types" to "service_role";

grant select on table "public"."travel_types" to "service_role";

grant trigger on table "public"."travel_types" to "service_role";

grant truncate on table "public"."travel_types" to "service_role";

grant update on table "public"."travel_types" to "service_role";

grant delete on table "public"."user_bookmarked_expense_cards" to "anon";

grant insert on table "public"."user_bookmarked_expense_cards" to "anon";

grant references on table "public"."user_bookmarked_expense_cards" to "anon";

grant select on table "public"."user_bookmarked_expense_cards" to "anon";

grant trigger on table "public"."user_bookmarked_expense_cards" to "anon";

grant truncate on table "public"."user_bookmarked_expense_cards" to "anon";

grant update on table "public"."user_bookmarked_expense_cards" to "anon";

grant delete on table "public"."user_bookmarked_expense_cards" to "authenticated";

grant insert on table "public"."user_bookmarked_expense_cards" to "authenticated";

grant references on table "public"."user_bookmarked_expense_cards" to "authenticated";

grant select on table "public"."user_bookmarked_expense_cards" to "authenticated";

grant trigger on table "public"."user_bookmarked_expense_cards" to "authenticated";

grant truncate on table "public"."user_bookmarked_expense_cards" to "authenticated";

grant update on table "public"."user_bookmarked_expense_cards" to "authenticated";

grant delete on table "public"."user_bookmarked_expense_cards" to "service_role";

grant insert on table "public"."user_bookmarked_expense_cards" to "service_role";

grant references on table "public"."user_bookmarked_expense_cards" to "service_role";

grant select on table "public"."user_bookmarked_expense_cards" to "service_role";

grant trigger on table "public"."user_bookmarked_expense_cards" to "service_role";

grant truncate on table "public"."user_bookmarked_expense_cards" to "service_role";

grant update on table "public"."user_bookmarked_expense_cards" to "service_role";

grant delete on table "public"."user_pinned_cities" to "anon";

grant insert on table "public"."user_pinned_cities" to "anon";

grant references on table "public"."user_pinned_cities" to "anon";

grant select on table "public"."user_pinned_cities" to "anon";

grant trigger on table "public"."user_pinned_cities" to "anon";

grant truncate on table "public"."user_pinned_cities" to "anon";

grant update on table "public"."user_pinned_cities" to "anon";

grant delete on table "public"."user_pinned_cities" to "authenticated";

grant insert on table "public"."user_pinned_cities" to "authenticated";

grant references on table "public"."user_pinned_cities" to "authenticated";

grant select on table "public"."user_pinned_cities" to "authenticated";

grant trigger on table "public"."user_pinned_cities" to "authenticated";

grant truncate on table "public"."user_pinned_cities" to "authenticated";

grant update on table "public"."user_pinned_cities" to "authenticated";

grant delete on table "public"."user_pinned_cities" to "service_role";

grant insert on table "public"."user_pinned_cities" to "service_role";

grant references on table "public"."user_pinned_cities" to "service_role";

grant select on table "public"."user_pinned_cities" to "service_role";

grant trigger on table "public"."user_pinned_cities" to "service_role";

grant truncate on table "public"."user_pinned_cities" to "service_role";

grant update on table "public"."user_pinned_cities" to "service_role";

grant delete on table "public"."user_profiles" to "anon";

grant insert on table "public"."user_profiles" to "anon";

grant references on table "public"."user_profiles" to "anon";

grant select on table "public"."user_profiles" to "anon";

grant trigger on table "public"."user_profiles" to "anon";

grant truncate on table "public"."user_profiles" to "anon";

grant update on table "public"."user_profiles" to "anon";

grant delete on table "public"."user_profiles" to "authenticated";

grant insert on table "public"."user_profiles" to "authenticated";

grant references on table "public"."user_profiles" to "authenticated";

grant select on table "public"."user_profiles" to "authenticated";

grant trigger on table "public"."user_profiles" to "authenticated";

grant truncate on table "public"."user_profiles" to "authenticated";

grant update on table "public"."user_profiles" to "authenticated";

grant delete on table "public"."user_profiles" to "service_role";

grant insert on table "public"."user_profiles" to "service_role";

grant references on table "public"."user_profiles" to "service_role";

grant select on table "public"."user_profiles" to "service_role";

grant trigger on table "public"."user_profiles" to "service_role";

grant truncate on table "public"."user_profiles" to "service_role";

grant update on table "public"."user_profiles" to "service_role";


