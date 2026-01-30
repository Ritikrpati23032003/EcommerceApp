# Ecommerce Application – Kubernetes Deployment Guide

This document explains the step-by-step process to deploy the Ecommerce application on a Kubernetes cluster.

---

## Prerequisites

* Kubernetes cluster up and running
* `kubectl` configured with cluster access
* Namespace `ecommerce` already created
* Git installed

---

## Step 0: Install kubectl

Install kubectl binary:

```bash
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /usr/local/bin
kubectl version --short --client
```

---

## Step 1: Configure EKS Cluster Access

Update kubeconfig to connect to the EKS cluster:

```bash
aws eks update-kubeconfig --region us-east-1 --name kuber
```

---

## Step 2: Create Namespace

Create the `ecommerce` namespace:

```bash
kubectl create namespace ecommerce
```

---

## Step 3: Deploy Database and Backend Services

Apply MongoDB, Mongo Express, and Backend manifests:

```bash
kubectl apply -f mongo.yaml
kubectl apply -f mongo-express.yaml
kubectl apply -f backend.yaml
```

---

## Step 2: Verify Backend Service

Check backend service and note the **LoadBalancer URL / External IP**:

```bash
kubectl get svc -n ecommerce
```

---

## Step 3: Update Environment Variables

Update the backend LoadBalancer URL in the following files:

* `frontend/.env`
* `seller/.env`

---

## Step 4: Deploy Frontend and Seller Services

Pull the latest code and deploy frontend and seller applications:

```bash
git pull
kubectl apply -f frontend.yaml
kubectl apply -f seller.yaml
```

---

## Step 5: Update Backend Environment Variables

Once frontend and seller services are running, update their service URLs in:

* `backend/.env`

---

## Step 6: Re-deploy Backend Service

Pull the latest changes and re-apply backend configuration:

```bash
git pull
kubectl apply -f backend.yaml
```

---

## Step 7: Final Verification

Verify that all pods and services are running correctly:

```bash
kubectl get pods -n ecommerce
kubectl get svc -n ecommerce
```

---

## Deployment Status

If all pods are in **Running** state and services have valid ClusterIP / LoadBalancer IPs, the deployment is successful.

---

✅ Deployment completed successfully
Good Luck !