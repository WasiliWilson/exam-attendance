package com.attendnce.eas;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import org.w3c.dom.Text;

import java.util.ArrayList;

public class ScanId extends AppCompatActivity {

    private TextView btnScan;
    private TextView txtResult;

    DatabaseHelpertwo db;
    String classes="";

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
}