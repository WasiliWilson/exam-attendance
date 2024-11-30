package com.attendance.eas;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.util.HashMap;
import java.util.Map;
public class ScanId extends AppCompatActivity {

    private TextView btnScan;
    private TextView txtResult;

    DatabaseHelpertwo db;
    String classes="";

    private static final String TAG = "GoogleSheetsAPI";
    private static final String URL = "https://script.google.com/macros/s/AKfycbzKQGBG7k4qrkB86okBzEHsAYBIy-N1wLBLIdq4LrLSA-URSqxdluyG4nfoUgrjbFog/exec";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scan_id);

        btnScan = findViewById(R.id.btnScan);
        txtResult = findViewById(R.id.txtResult);
        db=new DatabaseHelpertwo(this);
        TextView list=findViewById(R.id.list);

        list.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                startActivity(new Intent(getApplicationContext(), Attendace.class));

            }
        });

        Intent intent=getIntent();
        classes=intent.getStringExtra("class");

        // Set up scan button
        btnScan.setOnClickListener(v -> startQRCodeScanner());
    }

    private void startQRCodeScanner() {
        IntentIntegrator integrator = new IntentIntegrator(this);
        integrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE);
        integrator.setPrompt("Scan a QR Code");
        integrator.setCameraId(0); // Use a specific camera of the device
        integrator.setBeepEnabled(true);
        integrator.setBarcodeImageEnabled(true);
        integrator.initiateScan();
    }

    // Handle the result of the scan
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null) {
            if (result.getContents() != null) {
                txtResult.setText("Scanned: " + result.getContents());

                sendDataToSheet(result.getContents());
                boolean insert=db.insertData(result.getContents(), "one");
                if(insert){

                    Toast.makeText(getApplicationContext(), "saved", Toast.LENGTH_SHORT).show();
                }

                btnScan.setText("SCAN ANOTHER ID");
                
            } else {
                txtResult.setText("Scan cancelled");
            }
        }
    }

    private void sendDataToSheet(String studentId) {
        RequestQueue queue = Volley.newRequestQueue(this);

        // Create the JSON payload
        Map<String, String> postData = new HashMap<>();
        postData.put("id", studentId);

        // Create a Gson object to convert the map to JSON
        Gson gson = new Gson();
        String jsonPayload = gson.toJson(postData);

        // Set up the POST request
        StringRequest stringRequest = new StringRequest(Request.Method.POST, URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Handle the JSON response from the server
                        Log.d(TAG, "Response: " + response);

                        // Parse the response
                        JsonObject jsonResponse = gson.fromJson(response, JsonObject.class);

                        String status = jsonResponse.get("status").getAsString();
                        if (status.equals("success")) {
                            String scanType = jsonResponse.get("scanType").getAsString();
                            String studentName = jsonResponse.get("name").getAsString();
                            String timestamp = jsonResponse.get("time").getAsString();

                            Toast.makeText(getApplicationContext(), "Scan successful: " + scanType, Toast.LENGTH_SHORT).show();
                            Log.d(TAG, "Scan Success: " + studentName + " - " + timestamp);
                        } else if (status.equals("already_scanned")) {
                            Toast.makeText(getApplicationContext(), "Already scanned twice.", Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(getApplicationContext(), "Student not found.", Toast.LENGTH_SHORT).show();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e(TAG, "Error sending data", error);
                Toast.makeText(getApplicationContext(), "Error sending data", Toast.LENGTH_SHORT).show();
            }
        }) {

            @Override
            public byte[] getBody() {
                return jsonPayload.getBytes();
            }

            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                headers.put("Content-Type", "application/json");  // Set the content type to JSON
                return headers;
            }
        };

        queue.add(stringRequest);
    }
}