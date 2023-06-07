/*

👌Migration Commands
1. php artisan make:migration create_posts_table
2. php artisan migrate
3. php artisan migrate:status
4. php artisan migrate --pretend // we should run it before migrate
5. php artisan migrate:reset  //rollback all the database migrations and reset the database to its initial state.
6. php artisan migrate --force  //This command will execute the migrations without any confirmation prompt, allowing the migrations to run in a production environment.

7. php artisan migrate:rollback
8. php artisan migrate:rollback --step=2
9. php artisan migrate:refresh //refresh the database by rolling back all migrations and then re-running them. It effectively resets the database to its initial state and re-applies all migrations.
10.php artisan migrate:refresh --step=2

11. php artisan migrate:fresh  //This command will drop all tables from the database and then re-run all migrations using the migrate command. It effectively resets the database and applies all migrations from the beginning.

12. php artisan make:migration add_soft_deletes_in_posts_table --table=posts

13. php artisan make:migration rename_description_to_content_on_posts_table --table=posts
14. composer require doctrine/dbal //for renaming we need to install this package
15. php artisan make:migration drop_deleted_at_from_posts_table --table=posts
*/

/*
👌 Factory/Seeder Commands
1. php artisan make:factory PostFactory
2. php artisan make:model Post -f
3. php artisan make:seeder PostSeeder
4. php artisan db:seed --class=PostSeeder
5. php artisan db:seed
6. php artisan tinker
7. App\Models\Post::factory(5)->create()
8. php artisan db:seed
9. php artisan migrate --seed
10 php artisan migrate:refresh --seed
*/

/*
👌 Primary and Foreign Key
1. php artisan migrate:refresh
2.php artisan db:table posts
3. php artisan tinker
4.User::factory(5)->create()
5. App\Models\User::factory(10)->create()
6. php artisan make:controller PostsController --resource

*/

/*
👌Query Builder :

👌Laravel's query builder is a set of classes and methods that provide
a simple and elegant way to interact with databases
👉In Laravel, the get() method is used to retrieve multiple records from the database table. It is commonly used when you need to fetch a collection of data that matches certain criteria.

1.$posts= DB::table('posts')->select('excerpt','description')->get();

2.$posts= DB::table('posts')->select('is_published')->distinct()->get();

3. $posts= DB::table('posts')->select('is_published');
        $added =$posts->addSelect('title')->get();
        dd($added);

💘First, value and find method (these methods used for retrieve a single row):
The first() method return an object, which can be accessed using the arrow notation
The value() method is used to retrieve a single value from a result set.
The find() method is used to retrieve a single record by its primary key.
................................x...........................

4.$posts=DB::table('posts')->where('id',2)->first();
    dd($posts);

4a.$posts=DB::table('posts')->where('id',2)->first();
    dd($posts->description);

5. $posts=DB::table('posts')->where('id',2)->value('description');
    dd($posts);

6.  $posts=DB::table('posts')->find(2);
    dd($posts);

💘Retrieving a list of column values (pluck method):
The pluck() method is used to retrieve a single columns value from the
first result of a query.


7. $posts=DB::table('posts')->pluck('title');
    dd($posts);

💘 Inserts through the query builder(insert method)
💘insertOrIgnore() method is a method that allows you to insert data
into a database table only if the data doesn't already exist in the table
💘The insertGetId() method allows you to insert a new record into a table and
retrieve its id in a single query


8.  $posts = DB::table( 'posts' )->insert( [
            'user_id' => 1,
                 'title' => 'Insert through the DB facade 1',
                'slug' => 'insert-through-the-db-facade-1',
               'excerpt' => 'excerpt',
                'description' => 'description',
                'is_published' => true,
                'min_to_read' => 2,
         ] );
         dd($posts);


9. $posts = DB::table( 'posts' )->insert( [
             [
                'user_id' => 1,
                'title' => 'Insert through the DB facade 3',
                'slug' => 'insert-through-the-db-facade-3',
                'excerpt' => 'excerpt',
                'description' => 'description',
                'is_published' => true,
                'min_to_read' => 2,
            ],
            [
                'user_id' => 1,
                'title' => 'Insert through the DB facade 4',
                'slug' => 'insert-through-the-db-facade-4',
                'excerpt' => 'excerpt',
                'description' => 'description',
                'is_published' => true,
                'min_to_read' => 2,
            ]
        ] );
        dd($posts);

10. $posts=DB::table( 'posts' )->insertOrIgnore( [
    [
        'user_id'      => 1,
        'title'        => 'X',
        'slug'         => 'x',
        'excerpt'      => 'excerpt',
        'description'  => 'description',
        'is_published' => true,
        'min_to_read'  => 2,
    ],
    [
        'user_id'      => 1,
        'title'        => 'Insert through the DB facade 4',
        'slug'         => 'insert-through-the-db-facade-4',
        'excerpt'      => 'excerpt',
        'description'  => 'description',
        'is_published' => true,
        'min_to_read'  => 2,
    ],
] );
dd($posts);


11.  upsert()
        $posts = DB::table('posts')->upsert([
            [
                'user_id' => 1,
                'title' => 'X',
                'slug' => 'x',
                'excerpt' => 'Updated excerpt',
                'description' => 'Updated description',
                'is_published' => true,
                'min_to_read' => 2,
            ],
        ], ['title', 'slug']);

        dd($posts)

12.insertGetId();
$posts=DB::table( 'posts' )->insertGetId( [
    'user_id'      => 1,
    'title'        => 'Insert through the insertGetId',
    'slug'         => 'insert-through-the-insertgetid',
    'excerpt'      => 'excerpt',
    'description'  => 'description',
    'is_published' => true,
    'min_to_read'  => 2,
] );

dd($posts);

13.Update one row
 $updated=DB::table( 'posts' )
     ->where( 'id', 2 )
    ->update( [
        'excerpt'     => 'Laravel 10',
        'description' => 'Laravel 10',
    ] );

 dd($updated);

 14.Update multiple rows
$updated=DB::table( 'posts' )
    ->where( 'id', '<', 5 )
    ->update( [
        'excerpt'     => 'Laravel 10',
        'description' => 'Laravel 10',
    ] );

dd($updated);


15.// Update multiple conditions
        DB::table('posts')
            ->where('id', 1000)
            ->orWhere('id', 1001)
            ->update([
                'excerpt' => 'Laravel 10x',
                'description' => 'Laravel 10x'
            ]);

16.// Increment
        DB::table('posts')
            ->where('min_to_read', 1000)
            ->increment('min_to_read');

17. //Decrement
        DB::table('posts')
            ->where('id', 1000)
            ->decrement('min_to_read', 4);

18.//Increment or decrement multiple columns
        DB::table('posts')
            ->incrementEach(['min_to_read', 'lines']);

19.// updateOrInsert
        DB::table('posts')
            ->updateOrInsert(
                ['excerpt' => 'Laravel 10x'],
                ['id' => 1000]
            );


20.// Delete one row
        DB::table('posts')
            ->where('id', 1017)
            ->delete();

21.//Delete based on multiple conditions
        DB::table('posts')
            ->where('id', 1014)
            ->where('title', 'x')
            ->delete();

22. //Delete all records
        DB::table('posts')
            ->truncate();

👉Aggregate Methods

23. // Count Rows
        DB::table('posts')->count();
        DB::table('posts')->where('is_published', true)->count();

23.// Sum
        DB::table('posts')->sum('min_to_read');

24.// Average
        DB::table('posts')->avg('min_to_read');
        DB::table('posts')->where('is_published', true)->avg('min_to_read');

25.//  Max
        DB::table('posts')->where('is_published', true)->max('min_to_read');

26.// Min
        DB::table('posts')->where('is_published', true)->min('min_to_read');
27.// whereNot()
        DB::table('posts')->whereNot('min_to_read', 1)->get();
        DB::table('posts')->whereNot('min_to_read', '>', 1)->get();

28.// orWhereNot()
        DB::table('posts')
            ->where('min_to_read', '>', 5)
            ->orWhereNot('is_published', true)
            ->get();

29. // exists()
        if(DB::table('posts')->where('id', 343543)->exists()) {
            echo 'Woohoo, I found a match';
        } else {
            echo 'Ahh, I have not found a match';
        }

30. doesntExist()
        if(DB::table('posts')->where('id', 343543)->doesntExist()) {
            echo 'Woohoo, I found a match';
        } else {
            echo 'Ahh, I have not found a match';
        }

31. // whereBetween()
        DB::table('posts')->whereBetween('min_to_read', [1, 5])->get();

32. //whereNotBetween()
        DB::table('posts')->whereNotBetween('min_to_read', [1, 5])->get();

*/
