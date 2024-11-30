package com.attendance.eas;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;

public class DatabaseHelper extends SQLiteOpenHelper {

    // Database Information
    private static final String DATABASE_NAME = "UserDatabase";
    private static final int DATABASE_VERSION = 1;

    // Table and Column Names
    private static final String TABLE_USERS = "users";
    private static final String COLUMN_EMAIL = "email";
    private static final String COLUMN_USERNAME = "username";
    private static final String COLUMN_DEPARTMENT = "department";
    private static final String COLUMN_COURSE = "course";
    private static final String COLUMN_PASSWORD = "password";

    // Create Table SQL Statement
    private static final String CREATE_TABLE_USERS =
            "CREATE TABLE " + TABLE_USERS + " (" +
                    COLUMN_EMAIL + " TEXT PRIMARY KEY, " +
                    COLUMN_USERNAME + " TEXT NOT NULL, " +
                    COLUMN_DEPARTMENT + " TEXT NOT NULL, " +
                    COLUMN_COURSE + " TEXT NOT NULL, " +
                    COLUMN_PASSWORD + " TEXT NOT NULL" +
                    ");";

    // Constructor
    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // Create users table
        db.execSQL(CREATE_TABLE_USERS);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Drop older table if exists
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_USERS);
        onCreate(db);
    }

    // Insert a new user into the database
    public boolean insertUser(String email, String username, String department, String course, String password) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COLUMN_EMAIL, email);
        values.put(COLUMN_USERNAME, username);
        values.put(COLUMN_DEPARTMENT, department);
        values.put(COLUMN_COURSE, course);
        values.put(COLUMN_PASSWORD, password);

        long result = db.insert(TABLE_USERS, null, values);
        db.close();
        return result != -1; // Returns true if insertion is successful
    }

    // Retrieve all users from the database
    public Cursor getAllUsers() {
        SQLiteDatabase db = this.getReadableDatabase();
        return db.rawQuery("SELECT * FROM " + TABLE_USERS, null);
    }

    // Retrieve a specific user by email
    public Cursor getUserByEmail(String email) {
        SQLiteDatabase db = this.getReadableDatabase();
        return db.query(
                TABLE_USERS,
                null,
                COLUMN_EMAIL + "=?",
                new String[]{email},
                null,
                null,
                null
        );
    }

    public ArrayList<String> getData() {
        ArrayList<String> userPasswordList = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT " + COLUMN_USERNAME + ", " + COLUMN_PASSWORD + " FROM " + TABLE_USERS, null);

        if (cursor.moveToFirst()) {
            do {
                String username = cursor.getString(cursor.getColumnIndex(COLUMN_USERNAME));
                String password = cursor.getString(cursor.getColumnIndex(COLUMN_PASSWORD));
                userPasswordList.add(username + "//" + password);
            } while (cursor.moveToNext());
        }
        cursor.close();
        db.close();
        return userPasswordList;
    }

}
