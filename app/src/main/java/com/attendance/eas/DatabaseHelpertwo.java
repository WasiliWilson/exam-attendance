package com.attendance.eas;


import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;

public class DatabaseHelpertwo extends SQLiteOpenHelper {

    // Database and Table Information
    private static final String DATABASE_NAME = "MyDatabase.db";
    private static final int DATABASE_VERSION = 1;

    private static final String TABLE_NAME = "StatusTable";
    private static final String COLUMN_ID = "id";
    private static final String COLUMN_STATUS = "status";

    // SQL Query to Create the Table
    private static final String CREATE_TABLE = "CREATE TABLE " + TABLE_NAME + " (" +
            COLUMN_ID + " TEXT PRIMARY KEY, " +
            COLUMN_STATUS + " TEXT NOT NULL);";

    public DatabaseHelpertwo(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(CREATE_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
        onCreate(db);
    }

    // Insert Data
    // Insert or Update Data
    public boolean insertData(String id, String status) {
        SQLiteDatabase db = this.getWritableDatabase();

        // Check if the ID already exists
        Cursor cursor = db.query(TABLE_NAME,
                new String[]{COLUMN_ID},
                COLUMN_ID + " = ?",
                new String[]{id},
                null, null, null);

        if (cursor != null && cursor.moveToFirst()) {
            // If ID exists, update the status to "two"
            ContentValues contentValues = new ContentValues();
            contentValues.put(COLUMN_STATUS, "submitted");
            int rowsAffected = db.update(TABLE_NAME, contentValues, COLUMN_ID + " = ?", new String[]{id});
            cursor.close();
            return rowsAffected > 0; // Return true if at least one row was updated
        }

        // If ID doesn't exist, insert a new record
        ContentValues contentValues = new ContentValues();
        contentValues.put(COLUMN_ID, id);
        contentValues.put(COLUMN_STATUS, status);
        long result = db.insert(TABLE_NAME, null, contentValues);
        if (cursor != null) {
            cursor.close();
        }
        return result != -1; // Return true if inserted successfully
    }


    // Read All Data
    public Cursor getAllData() {
        SQLiteDatabase db = this.getReadableDatabase();
        return db.rawQuery("SELECT * FROM " + TABLE_NAME, null);
    }

    // Update Data
    public boolean updateData(String id, String newStatus) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COLUMN_STATUS, newStatus);

        int rowsAffected = db.update(TABLE_NAME, contentValues, COLUMN_ID + " = ?", new String[]{id});
        return rowsAffected > 0; // Return true if at least one row was updated
    }

    // Delete Data
    public boolean deleteData(String id) {
        SQLiteDatabase db = this.getWritableDatabase();
        int rowsDeleted = db.delete(TABLE_NAME, COLUMN_ID + " = ?", new String[]{id});
        return rowsDeleted > 0; // Return true if at least one row was deleted
    }

    public ArrayList<String[]> getData() {
        ArrayList<String[]> dataList = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM " + TABLE_NAME, null);

        if (cursor.moveToFirst()) {
            do {
                String id = cursor.getString(cursor.getColumnIndexOrThrow(COLUMN_ID));
                String status = cursor.getString(cursor.getColumnIndexOrThrow(COLUMN_STATUS));
                dataList.add(new String[]{id, status}); // Add the data as a String array
            } while (cursor.moveToNext());
        }
        cursor.close();
        return dataList;
    }

}
